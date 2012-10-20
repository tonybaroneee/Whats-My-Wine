package controllers;

import java.util.List;

import models.Wine;
import play.mvc.Controller;

public class Application extends Controller {

    public static void index() {
        render();
    }
    
    public static void getWineList() {
        String price = request.params.get("price");
        String style = request.params.get("style");

        List<Wine> wineList;
        StringBuilder query = new StringBuilder("");
        String priceQuery = "";
        String styleQuery = "";
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
        
        // Let's build the query
        if (priceQuery.length() > 0 && styleQuery.length() > 0) {
            query.append(priceQuery + andQuery + styleQuery);
        } else if (priceQuery.length() > 0) {
            query.append(priceQuery);
        } else if (priceQuery.length() > 0) {
            query.append(styleQuery);
        }
        query = query.append("order by price asc");
        
        // Finally, fetch the list of wines and return the result as a JSON object
        wineList = Wine.find(query.toString()).fetch();
        renderJSON(wineList);
    }

}