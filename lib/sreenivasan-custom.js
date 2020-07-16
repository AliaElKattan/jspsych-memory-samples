function trial_response(settings) {
    var response_area = {
        obj_type: 'circle',
        startX: settings.canvas_width / 2,
        startY: settings.canvas_height / 2,
        radius: settings.response_area_radius,
        line_color: settings.response_area_color,
        show_start_time: 0
    };

    var prompt_circle = {
        obj_type: 'circle',
        startX: settings.canvas_width / 2,
        startY: settings.canvas_width / 2,
        radius: settings.prompt_radius,
        fill_color: settings.prompt_color,
        show_start_time: 0
    };

    var response = {
        type: 'psychophysics',
        stimuli: [
            prompt_circle,
            response_area
        ],
        canvas_width: settings.canvas_width,
        canvas_height: settings.canvas_height,
        response_type: 'mouse',
        trial_duration: settings.duration
    };

    return response;
}


function intertrial_pause(settings) {
    var fixation_cross = {
        obj_type: 'cross',
        startX: settings.canvas_width / 2,
        startY: settings.canvas_height / 2,
        line_length: settings.cross_length,
        line_color: settings.cross_color,
        show_start_time: 0
    };

    var pause = {
        type: 'psychophysics',
        stimuli: [
            fixation_cross
        ],
        canvas_width: settings.canvas_width,
        canvas_height: settings.canvas_height,
        choices: jsPsych.NO_KEYS,
        trial_duration: settings.duration
    }

    return pause;
}
