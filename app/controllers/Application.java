package controllers;

import java.util.List;

import models.Wine;
import play.mvc.Controller;

public class Application extends Controller {

    public static void index() {
        renderArgs.put("home", true);
        render();
    }
    
    public static void getWineList() {
        String price = request.params.get("price");
        String style = request.params.get("style");
        String color = request.params.get("color");

        List<Wine> wineList;
        StringBuilder query = new StringBuilder("");
        String priceQuery = "";
        String styleQuery = "";
        String colorQuery = "";
        String andQuery = "and ";
        
        // See if there is a price constraint
        if (price.equals("low")) {
            priceQuery = "price < 11 ";
        } else if (price.equals("mid")) {
            priceQuery = "price between 10 and 17 ";
        } else if (price.equals("high")) {
            priceQuery = "price > 17 ";
        } else {
            // Do nothing
        }
        
        // See if there is a style constraint
        if (style.equals("1")) {
            styleQuery = "style is 1 ";
        } else if (style.equals("2")) {
            styleQuery = "style is 2 ";
        } else if (style.equals("3")) {
            styleQuery = "style is 3 ";
        } else {
            // Do nothing
        }
        
        // See if there is a style constraint
        if (color.equals("red")) {
            colorQuery = "type is 'red' ";
        } else if (color.equals("white")) {
            colorQuery = "type is 'white' ";
        } else {
            // Do nothing
        }
        
        // Let's build the query
        query.append(priceQuery);
        
        // Append style constraint
        if (styleQuery.length() > 0) {
            if (query.length() > 0) {
                query.append(andQuery + styleQuery);
            } else {
                query.append(styleQuery);
            }
        }
        
        // Append style constraint
        if (colorQuery.length() > 0) {
            if (query.length() > 0) {
                query.append(andQuery + colorQuery);
            } else {
                query.append(colorQuery);
            }
        }
        
        query = query.append("order by price asc");
        
        // Finally, fetch the list of wines and return the result as a JSON object
        wineList = Wine.find(query.toString()).fetch();
        renderJSON(wineList);
    }
    
    public static void wines(String type) {
        String sort = request.params.get("sort");
        String sortQuery = "";
        
        if (sort.equalsIgnoreCase("desc")) {
            sortQuery = "order by price desc";
        } else {
            sortQuery = "order by price asc";
        }
        
        List<Wine> wineList = Wine.find("type is ? " + sortQuery, type).fetch();
        renderArgs.put("type", type);
        renderArgs.put("wineList", wineList);
        render();
    }

}