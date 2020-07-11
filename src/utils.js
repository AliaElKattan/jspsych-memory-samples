function random_in_circle(center, radius) {
    var angle = Math.random() * 2 * Math.PI;
    var dist_from_center = Math.sqrt(Math.random() * radius * radius);

    return [dist_from_center * Math.cos(angle) + center[0],
            dist_from_center * Math.sin(angle) + center[1]];
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
