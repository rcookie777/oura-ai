

export const parseSleepData = (data) => {
    console.log("Parsing Data");
    let parsedData = null;
    let average_breath = 0;
    let average_heartrate = 0;
    let average_readiness = 0;
    let i = 0;
    let sleepStart = [];
    let sleepEnd = [];
    //Turn data into a map
    if (data) {
      const entries = Object.entries(data);
      parsedData = new Map(entries);
    //   console.log("Parsed Data!!!!!", parsedData);
    }


    if (parsedData) {
      parsedData.get("data").forEach((item) => {
        average_breath += item.average_breath
        average_heartrate += item.average_heart_rate
        i++;
        sleepStart.push(item.bedtime_start);
        sleepEnd.push(item.bedtime_end);
        if (item.readiness){
            average_readiness += item.readiness.score;
        }
      }
        );
    }
    average_heartrate = average_heartrate/i;
    average_breath = average_breath/i;
    average_readiness = average_readiness/i;
    console.log("Average Breath Rate", average_breath);
    console.log("Average Heart Rate", average_heartrate);
    console.log("Average Readiness", average_readiness);
    console.log("Sleep Start", sleepStart);
    console.log("Sleep End", sleepEnd);
    const dataArray = {
                        Breathrate:average_breath, 
                        Heartrate:average_heartrate, 
                        ReadinessScore:average_readiness, 
                        Sleepstart:sleepStart.toString(), 
                        Sleepend:sleepEnd.toString()
                    }
    // console.log("Data", dataArray);
    return dataArray;
  };
  

