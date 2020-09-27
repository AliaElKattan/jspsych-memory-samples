const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];

var target_coords = random_along_circumference(center, 200);
var distractor_coords = random_along_circumference(center, 200);

var distraction_stimuli = trial_distraction({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 2000,

    cross_length: 10,
    cross_color: 'black',

    stimuli_size: 10,

    target_coords: target_coords,
    target_color: 'red',
    target_end_time: 500,

    distractor_coords: distractor_coords,
    distractor_color: 'blue',
    distractor_start_time: 1150,
    distractor_end_time: 1350
});

var canvas = document.getElementById("myCanvas");

var distraction_response = trial_response({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    prompt_color: 'red',

    response_area_radius: 200,
    response_area_color: 'white'

});

var pause = intertrial_pause({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 650,

    cross_length: 10,
    cross_color: 'black'
});

jsPsych.init({
    timeline: [
        distraction_stimuli,
        distraction_response,
        pause
    ],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
