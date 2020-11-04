// const dimensions = [600, 600];
// const center = [dimensions[0] / 2, dimensions[1] / 2];
// const radius = 200;

var trial_num = 1; 
var trial_count = 0;
var curr_points = 0;

var distraction_count = 0;
// var timeline = [];

var distraction_map = [];

//taskmap
for (var i =0;i<trial_num;i++) {

    var settings = {
        canvas_width: dimensions[0],
        canvas_height: dimensions[1],
        center: center,
        radius: radius,
        colors: taskmap_colors,
        dist_offset: dist_offsets
    };


    distraction_map.push(generate_taskmap(settings));
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

    target_coords: distraction_map[i].target_coords,
    // target_color: 'red',
    target_color: distraction_map[i].target_color,
    target_end_time: 500,

    distractor_coords: distraction_map[i].distractor_coords,
    // distractor_color: 'blue',
    distractor_color: distraction_map[i].distractor_color,
    distractor_start_time: 1150,
    distractor_end_time: 1350
});

timeline.push(distraction_stimuli);

var distraction_response = trial_response({
    sample_type: "distraction",

    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,
    prompt_radius: 5,
    prompt_color: distraction_map[i].target_color,

    response_area_radius: 200,
    response_area_color: 'white'
});

timeline.push(distraction_response);


var pause = intertrial_pause({
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 650,

    cross_length: 10,
    cross_color: 'black'
});

timeline.push(pause);

var feedback = feedback_display({
    feedback_type: "display",
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],

    stimuli_size: 10,    
    target_coords: distraction_map[i].target_coords,
    target_color: distraction_map[i].target_color,

    response_area_radius: radius,
    response_area_color: 'white',
    duration: 2000
});

// var feedback = feedback_display({
//     feedback_type: "text",
//     canvas_width: dimensions[0],
//     canvas_height: dimensions[1],
//     duration: 2000
// });

timeline.push(feedback);

timeline.push(pause);

}


// jsPsych.init({
//     timeline: timeline,
//     on_finish: function() {

//         // jsPsych.data.displayData();
//         jsPsych.data.get().filter({collect: "TRUE"}).ignore(['collect', 'trial_type', 'trial_index', 'internal_node_id', 'key_press']).localSave('csv','distraction_data.csv');
//     }
// });


