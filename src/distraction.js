const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];
const radius = 200;

var trial_num = 5;
var trial_count = 0;

timeline = [];

var map = [];

for (var i =0;i<trial_num;i++) {
    map.push(generate_taskmap(dimensions[0], dimensions[1],center,radius));
}

for (var i =0; i<trial_num;i++) {

// var target_coords = random_along_circumference(center, 200);
// var distractor_coords = random_along_circumference(center, 200);

    var distraction_stimuli = trial_distraction({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 2000,

    cross_length: 10,
    cross_color: 'black',

    stimuli_size: 10,

    target_coords: map[i].target_coords,
    // target_color: 'red',
    target_color: map[i].target_color,
    target_end_time: 500,

    distractor_coords: map[i].distractor_coords,
    // distractor_color: 'blue',
    distractor_color: map[i].distractor_color,
    distractor_start_time: 1150,
    distractor_end_time: 1350
});

timeline.push(distraction_stimuli);

var distraction_response = trial_response({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    prompt_color: 'red',

    response_area_radius: 200,
    response_area_color: 'white'
});

timeline.push(distraction_response);

}
// var feedback_screen = feedback_display({
//     canvas_width: dimensions[0],
//     canvas_height: dimensions[1],
//     duration: 2000,

//     stimuli_size: 10,    
//     target_coords: target_coords,
//     target_color: 'red',

//     response_area_radius: 200,
//     response_area_color: 'white'
// });


const CORRECT = "<p style='color: green;'>Correct</p>"
const WRONG = "<p style='color: red;'>Wrong</p>"


// var answer = {
//         type: 'html-keyboard-response',
//         stimulus: function() {
//                 if (1<2) { //placeholder
//                     return CORRECT;
//                 } else {
//                 return WRONG;
//             }
//             },
//         choices: jsPsych.NO_KEYS,
//         trial_duration: 1000
//     };


var pause = intertrial_pause({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 650,

    cross_length: 10,
    cross_color: 'black'
});

timeline.push(pause);

jsPsych.init({
    timeline: timeline,
    on_finish: function() {

        // jsPsych.data.displayData();
        jsPsych.data.get().filter({collect: "TRUE"}).ignore(['collect', 'trial_type', 'trial_index', 'internal_node_id', 'key_press']).localSave('csv','distraction_data.csv');
    }
});


