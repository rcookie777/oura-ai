const axios = require("axios");

const FORMAT = "Date, Awake Time (s), Sleep Efficiency (%), Bedtime Start, Bedtime End, Time in Bed (s), Total Sleep Duration (s), Deep Sleep Duration (s), Light Sleep Duration (s), REM Sleep Duration (s), Restless Periods, Average Heart Rate, Lowest Heart Rate, Average Breath";

function summarizeSleepData(originalData) {
  return originalData.map(entry => {
    return {
      date: entry.summary_date.substr(0,10),
      awake_time: entry.awake,
      efficiency: entry.efficiency,
      bedtime_start: entry.bedtime_start,
      bedtime_end: entry.bedtime_end,
      time_in_bed: entry.total,
      total_sleep_duration: entry.duration,
      deep_sleep_duration: entry.deep,
      light_sleep_duration: entry.light,
      rem_sleep_duration: entry.rem,
      restless_periods: entry.restless,
      average_heart_rate: entry.hr_average,
      lowest_heart_rate: entry.hr_lowest,
      average_breath: entry.breath_average,
    };
  });
}

function summarizeActivityData(activityData) {
  return activityData.map(entry => {
    return {
      date: entry.day.substr(0, 10),
      score: entry.score,
      active_calories: entry.active_calories,
      average_met_minutes: entry.average_met_minutes,
      high_activity_time: entry.high_activity_time,
      low_activity_time: entry.low_activity_time,
      medium_activity_time: entry.medium_activity_time,
      inactivity_alerts: entry.inactivity_alerts,
      sedentary_time: entry.sedentary_time,
      steps: entry.steps,
      total_calories: entry.total_calories,
    };
  });
}

async function fetchSleepData(accessToken, startDate, endDate) {
    const apiUrl = `https://api.ouraring.com/v1/sleep?start=${startDate}&end=${endDate}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const reducedData = summarizeSleepData(response.data.sleep);
    return {
      format: FORMAT,
      data: reducedData
    };
  }

  async function fetchActivityData(accessToken, startDate, endDate) {
    const apiUrl = `https://api.ouraring.com/v2/usercollection/daily_activity?start_date=${startDate}&end_date=${endDate}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const summarizedData = summarizeActivityData(response.data.data);
    return {
      data: summarizedData,
    };
  }
  
module.exports = {
  FORMAT,
  fetchSleepData,
  fetchActivityData
};