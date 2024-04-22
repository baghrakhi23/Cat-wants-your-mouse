
let x = null;
let y = null;

const originalPos = Array.from(document.getElementsByClassName('pupil')).map(el => el.getBoundingClientRect());

function moveEye() {
	let xRaw = x;
	let yRaw = y;
	
	if (!xRaw || !yRaw) {
		requestAnimationFrame(moveEye);
		return;
	}

	
	Array.from(document.getElementsByClassName('pupil')).forEach((p,i) => {
		const xPos = p.getBoundingClientRect().x;
		const yPos = p.getBoundingClientRect().y;
		
		const xUnscaled = xRaw - xPos;
		const yUnscaled = yRaw - yPos;

		const size = Math.sqrt(xUnscaled ** 2 + yUnscaled ** 2);
		
		if (size < 10) return;

		const desiredX = xUnscaled/size * 10;
		const desiredY = yUnscaled/size * 10;
		
		const match = /translateX\((.*)px\).*translateY\((.*)px\)/.exec(p.style.transform);
		const currX = match ? +match[1] : 0;
		const currY = match ? +match[2] : 0;
		

		p.style.transform = `translateX(${currX + (desiredX - currX) * .1}px)translateY(${currY + (desiredY - currY) * .1}px)`
	});
	
	Array.from(document.getElementsByClassName('body')).forEach(p => {
		const xPos = p.getBoundingClientRect().x;
		const yPos = p.getBoundingClientRect().y;
		
		const xUnscaled = xRaw - xPos;
		const yUnscaled = yRaw - yPos;

		const size = Math.sqrt(xUnscaled ** 2 + yUnscaled ** 2);
		
		if (size < 10) return;

		const desiredX = xUnscaled/size * -20;
		
		const match = /translateX\((.*)px\).*translateY\((.*)px\)/.exec(p.style.transform);
		const currX = match ? +match[1] : 0;

		p.style.transform = `translateX(${currX + (desiredX - currX)*.05}px)translateY(-40px)`
	});
	
	requestAnimationFrame(moveEye);
}

document.addEventListener('mousemove', e => {
	x = e.clientX;
	y = e.clientY;
})

requestAnimationFrame(moveEye);