package models;

import javax.persistence.Entity;
import javax.persistence.Lob;

import play.db.jpa.Model;
import flexjson.JSONSerializer;

@Entity(name="wine")
public class Wine extends Model {

    public String name;
    public String color;
    public String location;
    public String world;
    public int style;
    public int price;
    public double alc;
    public boolean oaked;
    @Lob
    public String description;
    public String image;

    public Wine(String name, String color, String location, String world, int style, int price, double alc, boolean oaked, String description, String image) {
        this.name = name;
        this.color = color;
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
                "color",
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
