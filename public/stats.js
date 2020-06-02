// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    populateChart(data);
  });


API.getWorkoutsInRange()

  function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
  }
function populateChart(data) {
  let dailyDurations = dailyDuration(data);
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let dailyPounds = dailyTotalWeight(data);
  let workouts = workoutNames(data);
  let workoutsPieChart = workoutNamesForPieChart(data);
  const colors = generatePalette();

  const dateArray = [];

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  // if(data.length >= 7){
  //   for(let i = (data.length - 7); i <= (data.length - 1); i++){
  //     let date = data[i].day.split("T")[0];
  //     let finalDate = date.split("-");
  //     dateArray.push(finalDate[1] + "-" + finalDate[2]);
  //   }
  // }
  // else{
  //   data.forEach(exercise => {
  //     let date = exercise.day.split("T")[0];
  //     let finalDate = date.split("-");
  //     dateArray.push(finalDate[1] + "-" + finalDate[2]);
  //   });
  // }

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Workout Durations"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: "Pounds",
          data: dailyPounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workoutsPieChart,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

// I liked the way Bryan did this and wanna fix mine up better...
// function duration(data) {
//   const workouts = [];
//   const durations = [];

//   if(data.length <= 7){
//     data.forEach(day => {
//       day.exercises.forEach(exercise => {
//         if(workouts.indexOf(exercise.name.toLowerCase()) === -1){
//           workouts.push(exercise.name.toLowerCase());
//           durations.push(exercise.duration);
//         }
//         else{
//           durations[workouts.indexOf(exercise.name.toLowerCase())] += exercise.duration;
//         }
//       });
//     });
//     console.log("Durations:");
//     console.log(durations);
//     console.log(workouts);
//     return durations;
//   }
//   else{
//     for(let i = (data.length - 7); i <= (data.length - 1); i++){
//       data[i].exercises.forEach(exercise => {
//         if(workouts.indexOf(exercise.name.toLowerCase()) === -1){
//           workouts.push(exercise.name.toLowerCase());
//           durations.push(exercise.duration);
//         }
//         else{
//           durations[workouts.indexOf(exercise.name.toLowerCase())] += exercise.duration;
//         }
//       });
//     }
//     console.log("Durations:");
//     console.log(durations);
//     console.log(workouts);
//     return durations;
//   }
// }

// function dailyDuration(data) {
//   const durations = [];

//   if(data.length <= 7){
//     data.forEach(workout => {
//       const dailyDurations = [];
//       let dailyTotal = 0;
  
//       workout.exercises.forEach(exercise => {
//         dailyDurations.push(exercise.duration);
//       });
  
//       dailyDurations.forEach(duration => {
//         dailyTotal += duration;
//       });
  
//       durations.push(dailyTotal);
//     });
//     console.log("Daily Durations:");
//     console.log(durations);
//     return durations;
//   }
//   else{
//     for(let i = (data.length - 7); i <= (data.length - 1); i++){
//       const dailyDurations = [];
//       let dailyTotal = 0;

//       data[i].exercises.forEach(exercise => {
//         dailyDurations.push(exercise.duration);
//       });
     
//       dailyDurations.forEach(duration => {
//         dailyTotal += duration;
//       });
  
//       durations.push(dailyTotal);
//     }
//     console.log("Daily Durations:");
//     console.log(durations);
//     return durations;
//   }
// }

function duration(data) {
  const durations = [];

  data.forEach(workout => {
      workout.exercises.forEach(exercise => {
          durations.push(exercise.duration);
      });
  });

  return durations;
}

function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
      workout.exercises.forEach(exercise => {
          total.push(exercise.weight);
      });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
      workout.exercises.forEach(exercise => {
          workouts.push(exercise.name);
      });
  });

  return workouts;
}