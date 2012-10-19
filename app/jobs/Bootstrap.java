package jobs;

import models.Wine;
import play.jobs.Job;
import play.jobs.OnApplicationStart;
import play.test.Fixtures;

@OnApplicationStart
public class Bootstrap extends Job {

    public void doJob() {

        // Run all database setup code (filling in enums, etc.)
        setupDB();

    }

    private void setupDB() {
    	
    	Fixtures.load("all-wines.yml");

        
    }

}
