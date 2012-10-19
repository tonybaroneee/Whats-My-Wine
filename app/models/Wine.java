package models;

import javax.persistence.Entity;

import play.db.jpa.Model;
import flexjson.JSONSerializer;

@Entity(name="wine")
public class Wine extends Model {

    public String name;
    public String type;
    public int price;
    public String description;

    public Wine(String name, String type, int price, String description) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.description = description;
    }
    
    public String toJsonString() {
        JSONSerializer ser = new JSONSerializer().include(
                "id",
                "name",
                "type",
                "price",
                "description"
                ).exclude("*");
        return ser.serialize(this);
    }

}
