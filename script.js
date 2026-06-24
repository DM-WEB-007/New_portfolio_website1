 document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dynamic Count-Up Animation for Stats
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            
            // Determine speed/steps depending on the number scale
            const speed = target > 100 ? target / 60 : 1; 
            
            if (count < target) {
                counter.innerText = Math.ceil(count + speed) + '+';
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCount();
    });

    // 2. Button Interactive Click Effect
    const cvBtn = document.getElementById('cvBtn');
    cvBtn.addEventListener('mousedown', () => {
        cvBtn.style.transform = 'scale(0.95)';
    });
    
    cvBtn.addEventListener('mouseup', () => {
        cvBtn.style.transform = 'none';
    });
});



// Select all skill circles
const circles = document.querySelectorAll(".tool-circle");

// Animate function
function animateSkills() {
  circles.forEach(circle => {

    let target = parseInt(circle.getAttribute("data-percent"));
    let count = 0;

    // reset before animation (important for re-trigger safety)
    circle.innerHTML = "<span>0%</span>";
    circle.style.background = `conic-gradient(#ef9c22 0deg, #f3f3f3 0deg)`;

    let speed = 15; // lower = faster animation

    let interval = setInterval(() => {
      if (count >= target) {
        clearInterval(interval);
      } else {
        count++;

        // update number
        circle.innerHTML = `<span>${count}%</span>`;

        // update circular progress
        circle.style.background = `conic-gradient(
          #ef9c22 ${count * 3.6}deg,
          #f3f3f3 0deg
        )`;
      }
    }, speed);
  });
}

// Scroll trigger (runs only when section visible)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
    }
  });
}, {
  threshold: 0.4
});

// Observe tools section
const toolsSection = document.querySelector(".tools");
observer.observe(toolsSection);