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

//todo: check this function
function rand_color() {
    // var red = Math.random() * 255;
    // var green = Math.random() * 255;
    // var blue = Math.random() * 255;

    var options = [0,255];

    var red = options[Math.floor(Math.random() * options.length)];
    var green = options[Math.floor(Math.random() * options.length)];

    //make sure there's noo black or white
    if (red === 0 && green === 0) {
        var blue = 255;
    }

    if (red === 255 && green === 255) {
        var blue = 0;
    }

    else {
    var blue = options[Math.floor(Math.random() * options.length)];
}
    var rgb = 'rgb(' + red.toString() + ',' + green.toString() + ','  + blue.toString() + ')';
    console.log(rgb);

    return rgb;
}

function generate_taskmap(canvas_width, canvas_height, center, radius) {
    //generate target coords

    var target_coords = random_along_circumference(center, 200);
    var target_polar = pixeltoPolar(canvas_width,canvas_height,target_coords);

    var distractor_coords = random_along_circumference(center, 200);
    var distractor_polar = pixeltoPolar(canvas_width,canvas_height,distractor_coords);

    var filler_1_coords = random_along_circumference(center, 200);
    var filler_1_polar = pixeltoPolar(canvas_width,canvas_height,distractor_coords);

    var filler_2_coords = random_along_circumference(center, 200);
    var filler_2_polar = pixeltoPolar(canvas_width,canvas_height,distractor_coords);

    //get another rand angle if theyre less than 30 degrees apart
    while (Math.abs(distractor_polar.polar_angle - target_polar.polar_angle) <= 30) {
            var distractor_coords = random_along_circumference(center, 200);
            var distractor_polar = pixeltoPolar(canvas_width,canvas_height,distractor_coords);
    } 

    while (Math.abs(filler_1_polar.polar_angle - target_polar.polar_angle) <= 30) {
            var filler_1_coords = random_along_circumference(center, 200);
            var filler_1_polar = pixeltoPolar(canvas_width,canvas_height,distractor_coords);
    }

    while (Math.abs(filler_2_polar.polar_angle - target_polar.polar_angle) <= 30) {
            var filler_2_coords = random_along_circumference(center, 200);
            var filler_2_polar = pixeltoPolar(canvas_width,canvas_height,distractor_coords);
    }


    //define colors
    var target_color = rand_color();
    var distractor_color = rand_color();
    var filler_1_color = rand_color();
    var filler_2_color = rand_color();

    //change to lib to simplify

    while (target_color === distractor_color) {
        distractor_color = rand_color();
    }

    while (target_color === filler_1_color) {
        filler_1_color = rand_color();
    }

    while (target_color === filler_2_color) {
        filler_2_color = rand_color();
    }

    console.log("traget color: ", target_color);

    //not sure if thes can be the same color or not

    // while (target_color === cord_color) {
    //     coord_color = rand_color;
    // }

     return {
            target_coords: target_coords,
            distractor_coords: distractor_coords,
            filler_1_coords: filler_1_coords,
            filler_2_coords: filler_2_coords,
            target_color: target_color,
            distractor_color: distractor_color,
            filler_1_color: filler_1_color,
            filler_2_color: filler_2_color
        };
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

    //RESPONSE AREA must always be the first stimuli
    var response = {
        type: 'psychophysics',
        stimuli: [
            response_area,
            prompt_circle
        ],
        canvas_width: settings.canvas_width,
        canvas_height: settings.canvas_height,
        response_type: 'mouse',
        trial_duration: settings.duration,
        on_start: settings.on_start,
        // response_ends_trial: false,
        on_finish: function(data) {

            if(data.click_x) {
            trial_count +=1;
            console.log(trial_count);
            data.trial_count = trial_count;
            var target_pos = jsPsych.data.get().last(2).values()[0].target_pos;
            var click_target = pixeltoPolar(dimensions[0], dimensions[1], target_pos);
           
            data.target_angle = click_target.polar_angle;
            data.target_distance = click_target.polar_distance;

            var click_location = pixeltoPolar(dimensions[0], dimensions[1], [data.click_x, data.click_y]);

            data.click_angle = click_location.polar_angle;
            data.click_distance = click_location.polar_distance;

            data.angle_error = data.click_angle - data.target_angle;
            data.distance_error = data.click_distance - data.target_distance;
            data.collect="TRUE";


        }
    }

    };

    return response;
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
        on_finish: function(data) {
            show_cursor();
            data.target_pos = [target_circle.startX, target_circle.startY];
       }
    };

    return distraction;
}


function feedback_display(settings) {

    var target_circle = {
        obj_type: 'circle',
        startX: settings.target_coords[0],
        startY: settings.target_coords[1],
        radius: settings.stimuli_size / 2,
        fill_color: settings.target_color,
        // show_start_time: 0,
        // show_end_time: settings.target_end_time
    };

    var feedback = {
        type: 'psychophysics',
        stimuli: [
            target_circle
        ],
        canvas_width: settings.canvas_width,
        canvas_height: settings.canvas_height,
        choices: jsPsych.NO_KEYS,
        trial_duration: settings.duration
    };

    return feedback;
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
        // on_finish: show_cursor
         on_finish: function(data) {
            show_cursor();
            data.target_pos = [target_circle.startX, target_circle.startY];
       }
    };

    return filtration;
}


      //standalone conversion function
      //assuming position is an array of two values, the canvas x and y -- can change this depending on how we format
        function pixeltoPolar(canvas_width,canvas_height,position) {

        //convert canvas pixel, which start at 0,0 in the upper leftmost point and increase x and y as we go right and downwards - to a normal x,y grid that is centered at the center of the canvas.

        var x_axis = position[0] - canvas_width/2;
        var y_axis = canvas_height/2 - position[1];
        //calculate distance from 0,0 point to x,y point
        var polar_distance = Math.sqrt(Math.pow(Math.abs(x_axis),2) + Math.pow(Math.abs(y_axis),2));

        //calculate angle between x-axis and point
        var angle = Math.atan(Math.abs(y_axis)/Math.abs(x_axis));

        var polar_angle;

        //convert angle to the polar angle depending on which quadrant it's in (?)
        if (y_axis >= 0) {
            if (x_axis > 0) polar_angle = angle;
            if (x_axis === 0) polar_angle = Math.PI / 2;
            if (x_axis < 0) polar_angle = Math.PI - angle;            
        }

        if (y_axis < 0) {
          if (x_axis < 0) polar_angle = Math.PI + angle;
          if (x_axis === 0) polar_angle = 3*(Math.PI/2);
          if (x_axis > 0) polar_angle = 2*(Math.PI) - angle;

        }

        var polar = [polar_distance.toFixed(3), polar_angle.toFixed(3)];

        // return polar;
        return {
            polar_distance: polar[0],
            polar_angle: radtoDegrees(polar[1])
        };
      }

      // function clickError(target, click) {

      //   //check if this needs to be perecentage error

      //   var distance_error = (click.polar_distance - target.polar_distance); 
      //   var angle_error = (click.polar_angle - target.polar_angle);

      //   // var angle_error = radtoDegrees(angle_error_rad);

      //   return {
      //       distance_error: distance_error,
      //       angle_error: angle_error
      //   };
      // }

      function radtoDegrees(angle) {
        return angle * (180/Math.PI);
      }


      function getScreenSize() {

      }