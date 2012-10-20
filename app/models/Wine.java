package models;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OrderBy;

import play.db.jpa.Model;
import flexjson.JSONSerializer;

@Entity(name="wine")
public class Wine extends Model {

    public String name;
    public String type;
    public String location;
    public String world;
    public int style;
    public double alc;
    public boolean oaked;
    public String image;
    public int price;
    @Lob
    public String description;

    public Wine(String name, String type, String location, String world, int style, int price, double alc, boolean oaked, String description, String image) {
        this.name = name;
        this.type = type;
        this.location = location;
        this.world = world;
        this.style = style;
        this.price = price;
        this.alc = alc;
        this.oaked = oaked;
        this.description = description;
        this.image = image;
    }
    
    public String toJsonString() {
        JSONSerializer ser = new JSONSerializer().include(
                "id",
                "name",
                "type",
                "location",
                "world",
                "style",
                "price",
                "alc",
                "oaked",
                "description",
                "image"
                ).exclude("*");
        return ser.serialize(this);
    }

}
