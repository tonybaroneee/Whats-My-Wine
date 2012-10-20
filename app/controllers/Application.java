package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
        render();
    }
    
    public static void getWineList() {
        String price = request.params.get("price");

        List<Wine> wineList;
        StringBuilder query = new StringBuilder("");
        if (price.equals("low")) {
            query = query.append("price < ? order by price asc");
            wineList = Wine.find(query.toString(), 11).fetch();
        } else if (price.equals("mid")) {
            query = query.append("price between ? and ? order by price asc");
            wineList = Wine.find(query.toString(), 10, 18).fetch();
        } else if (price.equals("high")) {
            query = query.append("price > ? order by price asc");
            wineList = Wine.find(query.toString(), 17).fetch();
        } else {
            wineList = Wine.find("order by price asc").fetch();
        }
        
        renderJSON(wineList);
    }

}