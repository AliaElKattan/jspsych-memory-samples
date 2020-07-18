function random_in_circle(center, radius) {
    var angle = Math.random() * 2 * Math.PI;
    var dist_from_center = Math.sqrt(Math.random() * radius * radius);

    return [dist_from_center * Math.cos(angle) + center[0],
            dist_from_center * Math.sin(angle) + center[1]];
}


function random_along_circumference(center, radius) {
    var angle  = Math.random() * 2 * Math.PI;
    return [radius * Math.cos(angle) + center[0],
            radius * Math.sin(angle) + center[1]];
}


function hide_cursor() {
    document.body.style.cursor = 'none';
}


function show_cursor() {
    document.body.style.cursor = 'default';
}


function reflect_across_line(point, center, angle) {
    var rad = angle * Math.PI / 180;
    var normalized_point = [point[0] - center[0], point[1] - center[1]];
    var reflected_point = [
        Math.cos(2 * rad) * normalized_point[0] + Math.sin(2 * rad) * normalized_point[1],
        Math.sin(2 * rad) * normalized_point[0] - Math.cos(2 * rad) * normalized_point[1]
    ];
    reflected_point = [reflected_point[0] + center[0], reflected_point[1] + center[1]];

    return reflected_point;
}


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
    };

    return pause;
}


function trial_distraction(settings) {
    var fixation_cross = {
        obj_type: 'cross',
        startX: settings.canvas_width / 2,
        startY: settings.canvas_height / 2,
        line_length: settings.cross_length,
        line_color: settings.cross_color,
        show_start_time: 0
    };

    var target_circle = {
        obj_type: 'circle',
        startX: settings.target_coords[0],
        startY: settings.target_coords[1],
        radius: settings.stimuli_size / 2,
        fill_color: settings.target_color,
        show_start_time: 0,
        show_end_time: settings.target_end_time
    };

    var distractor_square = {
        obj_type: 'rect',
        startX: settings.distractor_coords[0],
        startY: settings.distractor_coords[1],
        width: settings.stimuli_size,
        height: settings.stimuli_size,
        fill_color: settings.distractor_color,
        show_start_time: settings.distractor_start_time,
        show_end_time: settings.distractor_end_time
    };

    var distraction = {
        type: 'psychophysics',
        stimuli: [
            fixation_cross,
            target_circle,
            distractor_square
        ],
        canvas_width: settings.canvas_width,
        canvas_height: settings.canvas_height,
        choices: jsPsych.NO_KEYS,
        trial_duration: settings.duration,
        on_start: hide_cursor,
        on_finish: show_cursor
    };

    return distraction;
}


function trial_filtration(settings) {
    var fixation_cross = {
        obj_type: 'cross',
        startX: settings.canvas_width / 2,
        startY: settings.canvas_height / 2,
        line_length: settings.cross_length,
        line_color: settings.cross_color,
        show_start_time: 0
    };

    var target_circle = {
        obj_type: 'circle',
        startX: settings.target_coords[0],
        startY: settings.target_coords[1],
        radius: settings.target_size / 2,
        fill_color: settings.target_color,
        show_start_time: 0,
        show_end_time: settings.target_end_time
    };

    var fillers = [];
    for (var i = 0; i < settings.filler_num; i++) {
        fillers.push({
            obj_type: settings.filler_shape,
            startX: settings.filler_coords[i][0],
            startY: settings.filler_coords[i][1],
            fill_color: settings.filler_color[i],
            show_start_time: settings.filler_start_time,
            show_end_time: settings.filler_end_time
        });
        if (fillers[i].obj_type == 'circle') {
            fillers[i].radius = settings.filler_radius;
        } else {
            if ('filler_width' in settings) {
                fillers[i].width = settings.filler_width;
            }
            if ('filler_height' in settings) {
                fillers[i].height = settings.filler_height;
            }
        }
    }

    var stimuli = [fixation_cross, target_circle];

    for (var i = 0; i < fillers.length; i++) {
        stimuli.push(fillers[i]);
    }

    var filtration = {
        type: 'psychophysics',
        stimuli: stimuli,
        canvas_width: settings.canvas_width,
        canvas_height: settings.canvas_height,
        choices: jsPsych.NO_KEYS,
        trial_duration: settings.duration,
        on_start: hide_cursor,
        on_finish: show_cursor
    };

    return filtration;
}
