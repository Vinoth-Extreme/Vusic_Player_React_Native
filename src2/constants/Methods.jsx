const HumanizeMillis = (millis) => {
    let secs = Math.floor(millis / 1000)
    let hrs = Math.floor(secs / 3600)
    secs -= hrs * 3600
    let min = Math.floor(secs / 60)
    secs -= min * 60

    if (hrs > 0) {
			min = "" + min;
			min = ("00" + min).substring(min.length);
			return hrs + ":" + min + ":" + secs;
		} else {
            if(min < 10) {
                min = "0" + min
            }
            if(secs < 10) {
                secs = "0" + secs
            }
			return min + ":" + secs;
		}
}

const getThumbnail = (title) => {
    return title[0]
}

export { 
    HumanizeMillis,
    getThumbnail
}