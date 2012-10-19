package jobs;

import play.jobs.Job;
import play.jobs.OnApplicationStart;

@OnApplicationStart
public class Bootstrap extends Job {

    public void doJob() {

        // Run all database setup code (filling in enums, etc.)
        setupDB();

    }

    private void setupDB() {

        // Add wines

    }

}
