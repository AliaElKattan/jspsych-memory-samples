// const dimensions = [600, 600];
// const center = [dimensions[0] / 2, dimensions[1] / 2];
// const radius = 200;
// var timeline = [];

//total number of trials
var trial_num = 1;

//trial index counter
var trial_count = 0;

var curr_points = 0;

var load_3_map = [];

var load_3_count = 0;


//taskmap
for (var i =0;i<trial_num;i++) {

    var settings = {
        canvas_width: dimensions[0],
        canvas_height: dimensions[1],
        center: center,
        radius: radius,
        colors: taskmap_colors
    };


    load_3_map.push(generate_taskmap(settings));
}


for (var i =0; i<trial_num;i++) {

var fixation_cross_1 = {
    obj_type: 'cross',
    startX: center[0],
    startY: center[1],
    line_length: 10,
    line_color: 'black',
    show_start_time: 0,
    show_end_time: 1150
};
var fixation_cross_2 = {
    obj_type: 'cross',
    startX: center[0],
    startY: center[1],
    line_length: 10,
    line_color: 'black',
    show_start_time: 1350,
    show_end_time: 2000
};

var target_circle = {
    obj_type: 'circle',
    startX: load_3_map[i].target_coords[0],
    startY: load_3_map[i].target_coords[1],
    radius: 5,
    // fill_color: 'red',
    fill_color: load_3_map[i].target_color,
    show_start_time: 0,
    show_end_time: 500
};

var filler_1_circle = {
    obj_type: 'circle',
    startX: load_3_map[i].filler_1_coords[0],
    startY: load_3_map[i].filler_1_coords[1],
    radius: 5,
    // fill_color: 'blue',
    fill_color: load_3_map[i].filler_1_color,
    show_start_time: 0,
    show_end_time: 500
};
var filler_2_circle = {
    obj_type: 'circle',
    startX: load_3_map[i].filler_2_coords[0],
    startY: load_3_map[i].filler_2_coords[1],
    radius: 5,
    // fill_color: 'green',
    fill_color: load_3_map[i].filler_2_color,
    show_start_time: 0,
    show_end_time: 500
};

var retrocue = {
    obj_type: 'rect',
    startX: center[0],
    startY: center[1],
    width: 10,
    height: 10,
    fill_color: 'white',
    show_start_time: 1150,
    show_end_time: 1350
};


var load_3_stimuli = {
    type: 'psychophysics',
    stimuli: [
        fixation_cross_1, fixation_cross_2,
        target_circle,
        filler_1_circle, filler_2_circle,
        retrocue
    ],
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
    on_start: hide_cursor,
      on_finish: function(data) {
            show_cursor();
            data.target_pos = load_3_map[load_3_count].target_coords;
            load_3_count+=1;
       }
}

timeline.push(load_3_stimuli);

var load_3_response = trial_response({
    sample_type: "load_3",
    canvas_width: dimensions[0],
    canvas_height: dimensions[1],
    duration: 10000,

    prompt_radius: 5,
    // prompt_color: 'red',
    prompt_color: load_3_map[i].target_color,

    response_area_radius: 200,
    response_area_color: 'white'
});
timeline.push(load_3_response);

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
    target_coords: load_3_map[i].target_coords,
    target_color: load_3_map[i].target_color,

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
//          jsPsych.data.get().filter({collect: "TRUE"}).ignore(['collect', 'trial_type', 'trial_index', 'internal_node_id', 'key_press']).localSave('csv','load3_data.csv');

//     }
// });
