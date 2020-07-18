const dimensions = [600, 600];
const center = [dimensions[0] / 2, dimensions[1] / 2];

var target_coords = random_along_circumference(center, 200);
var filler_1_coords = random_along_circumference(center, 200);
var filler_2_coords = random_along_circumference(center, 200);

var filtration_stimuli = trial_filtration({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 2000,

    cross_length: 10,
    cross_color: 'black',

    target_coords: target_coords,
    target_color: 'red',
    target_size: 10,
    target_end_time: 500,

    filler_shape: 'triangle',
    filler_num: 2,
    filler_start_time: 0,
    filler_end_time: 500,
    filler_coords: [filler_1_coords, filler_2_coords],
    filler_color: ['blue', 'green'],
    filler_height: 10
});

var filtration_response = trial_response({
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
        filtration_stimuli,
        filtration_response,
        pause
    ],
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
