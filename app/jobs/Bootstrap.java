package jobs;

import models.Wine;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

@OnApplicationStart
public class Bootstrap extends Job {

    public void doJob() {

        // Run all database setup code (filling in enums, etc.)
        setupDB();

    }

    private void setupDB() {

        /**
         * Week 1 Wines
         */
        
        Wine kingEstate = new Wine(
                "2011 King Estate Pinot Gris",
                "white",
                "Willamette Valley, Oregon",
                "new",
                2,
                15,
                13.0,
                false,
                "Light straw with emerald green hue. Aromas of green apple, citrus, honeysuckle, white peach, apricot and floral notes. Flavors of pear, melon, lemon and lime, wet stone, kiwi and honey. The palate has a soft, rich entry, nice texture, good weight and a long, lively crisp finish.",
                "king.jpg");
        kingEstate.save();

        Wine hugelGris = new Wine(
                "2007 Hugel Pinot Gris",
                "white",
                "Alsace, France",
                "old",
                1,
                18,
                13.0,
                false,
                "A fantastic vintage for this wine, ripe creamy but totally dry and sooooo food friendly with white meat dishes, pasta and mushroom based dishes such as rizotto. A wine that will still improve for years, building up its length and complexity for easily another 5 years.",
                "hugel.jpg");
        hugelGris.save();

        Wine lamorChardUnoaked = new Wine(
                "2010 Lamoreaux Landing Unoaked Chardonnay",
                "white",
                "Finger Lakes, NY",
                "new",
                2,
                12,
                13.2,
                false,
                "Fruit for this wine was specially chosen in the vineyard for balance and harvested at the peak of ripeness.  Enjoy with fish, poultry and artisan cheeses.",
                "lamoreaux.jpg");
        lamorChardUnoaked.save();

        Wine lamorChardOaked = new Wine(
                "2008 Lamoreaux Landing Reserve (Chardonnay)",
                "white",
                "Finger Lakes, NY",
                "new",
                3,
                20,
                12.8,
                false,
                "Aromas of Asian pear, honey, and toasty oak are followed by flavors of creamy fruit and spice. A satisfying balance of fruit and oak characteristics is achieved from sur lie aging in oak barrels, with partial malolactic fermentation. Complex and engaging on the palate, it is a classic match for the finest cheeses, seafood, poultry or pasta dishes in butter, cream sauce, or extra virgin olive oil.",
                "lamoreaux.jpg");
        lamorChardOaked.save();

        Wine ruffinoChianti = new Wine(
                "2008 Ruffino Ducale Chianti",
                "red",
                "Tuscany, Italy",
                "old",
                2,
                13,
                13.0,
                false,
                "Ruby red in color, with garnet hues. Riserva Ducale is characterized by particularly fragrant, sweet cherry and red berry fruit notes. Delicately spicy hints of tobacco and white pepper lead into aromas of roses and a touch of flint. Well-balanced on the palate, the taste reveals velvety tannins and good acidity, a fruity core spiced with cacao and clove, and a lingering finish of rosemary and figs.",
                "ruffino_ducale.jpg");
        ruffinoChianti.save();

        Wine ferrariCarano = new Wine(
                "2010 Ferrari Carano Siena",
                "red",
                "Sonoma County, CA",
                "new",
                2,
                20,
                14.1,
                true,
                "Siena has delicious aromas and flavors of freshpicked blackberries, raspberry jam, cola, cinnamon and clove. Sweet oak notes of vanilla and butterscotch complement lingering tart cherry, cranberry and strawberry. A wine with nice acidity and refined, elegant texture, Siena has tannins that are showy and evenly coat the palate.",
                "siena.jpg");
        ferrariCarano.save();

        /**
         * Week 2 Wines
         */
        
        Wine twoOceans = new Wine(
                "2011 Two Oceans Sauvignon Blanc",
                "white",
                "Western Cape, South Africa",
                "new",
                2,
                9,
                11.7,
                false,
                "Expect loads of lemon and a touch of fresh cut grass on the nose with full citrus backup playing the palate profile and singing summer from fresh start to vibrant finish. Consider pairing this pretty Sauvignon Blanc with grilled seafood, chicken and an array of veggie-themed hors d'oeuvres.",
                "twoceans.jpg");
        twoOceans.save();
        
        Wine relax = new Wine(
                "2011 Relax Reisling",
                "white",
                "Mosel, Germany",
                "new",
                1,
                10,
                9.5,
                false,
                "With forward fruit and floral aromas of apples and peaches with just a hint of citrus, the wine's natural acidity gives it a perfect balance that is refreshingly crisp and leaves your mouth watering. Relax Riesling is delicious on its own, and it pairs perfectly with a variety of foods, from grilled seafood and poultry to spicy oriental dishes and fresh salads.",
                "relax.jpg");
        relax.save();
        
        Wine toastedHead = new Wine(
                "2010 Toasted Head Chardonnay",
                "white",
                "California",
                "new",
                3,
                8,
                13.5,
                true,
                "The nose offers ripe pineapple and peach aromas with toasted graham cracker. The bright straw color prepares the palate for the rich tropical fruit and luscious stone fruit with a viscous mouth feel accented by toasted coconut, vanilla and butterscotch. The creamy finish lingers with hints of buttered toast and lemon zest. This wine will pair well with creamy Italian pasta dishes, roasted chicken or fish, and fresh summer corn.",
                "relax.jpg");
        toastedHead.save();
        
    }

}
