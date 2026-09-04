document.addEventListener('DOMContentLoaded', function () {
  var liveDate = document.getElementById('liveDate');
  if (liveDate) {
    liveDate.textContent = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(new Date());
  }

  var revealItems = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries, instance) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    revealItems.forEach(function (item) { observer.observe(item); });
  }

  var challengeKey = 'basanta-sleep-challenge-v1';
  var dayGrid = document.getElementById('dayGrid');
  var challengeCount = document.getElementById('challengeCount');
  var challengeProgress = document.getElementById('challengeProgress');
  var challengeMessage = document.getElementById('challengeMessage');
  var completedDays = [];

  try {
    completedDays = JSON.parse(localStorage.getItem(challengeKey)) || [];
  } catch (error) {
    completedDays = [];
  }

  function saveChallenge() {
    localStorage.setItem(challengeKey, JSON.stringify(completedDays));
  }

  function updateChallenge() {
    var count = completedDays.length;
    if (challengeCount) challengeCount.textContent = count;
    if (challengeProgress) challengeProgress.style.width = ((count / 30) * 100) + '%';

    document.querySelectorAll('.day-button').forEach(function (button) {
      var day = Number(button.dataset.day);
      var complete = completedDays.indexOf(day) !== -1;
      button.classList.toggle('done', complete);
      button.setAttribute('aria-pressed', complete ? 'true' : 'false');
      button.setAttribute('aria-label', 'Day ' + day + (complete ? ', complete' : ', incomplete'));
    });
  }

  if (dayGrid) {
    for (var day = 1; day <= 30; day += 1) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'day-button';
      button.dataset.day = day;
      button.textContent = day;
      button.addEventListener('click', function () {
        var selectedDay = Number(this.dataset.day);
        var existingIndex = completedDays.indexOf(selectedDay);
        if (existingIndex === -1) {
          completedDays.push(selectedDay);
          completedDays.sort(function (a, b) { return a - b; });
        } else {
          completedDays.splice(existingIndex, 1);
        }
        saveChallenge();
        updateChallenge();
        challengeMessage.textContent = 'Progress saved on this device.';
      });
      dayGrid.appendChild(button);
    }
    updateChallenge();
  }

  var markToday = document.getElementById('markToday');
  if (markToday) {
    markToday.addEventListener('click', function () {
      var nextDay = 1;
      while (completedDays.indexOf(nextDay) !== -1 && nextDay <= 30) nextDay += 1;

      if (nextDay > 30) {
        challengeMessage.textContent = 'Challenge complete. Thirty promises kept.';
        return;
      }

      completedDays.push(nextDay);
      completedDays.sort(function (a, b) { return a - b; });
      saveChallenge();
      updateChallenge();
      challengeMessage.textContent = 'Day ' + nextDay + ' marked complete.';
    });
  }

  var resetChallenge = document.getElementById('resetChallenge');
  if (resetChallenge) {
    resetChallenge.addEventListener('click', function () {
      var confirmed = window.confirm('Reset all 30-day challenge progress?');
      if (!confirmed) return;
      completedDays = [];
      saveChallenge();
      updateChallenge();
      challengeMessage.textContent = 'Challenge reset.';
    });
  }

  var reflectionKey = 'basanta-weekly-reflection-v1';
  var weeklyWin = document.getElementById('weeklyWin');
  var weeklyLesson = document.getElementById('weeklyLesson');
  var weeklyFocus = document.getElementById('weeklyFocus');
  var reflectionStatus = document.getElementById('reflectionStatus');

  try {
    var savedReflection = JSON.parse(localStorage.getItem(reflectionKey)) || {};
    if (weeklyWin) weeklyWin.value = savedReflection.win || '';
    if (weeklyLesson) weeklyLesson.value = savedReflection.lesson || '';
    if (weeklyFocus) weeklyFocus.value = savedReflection.focus || '';
  } catch (error) {}

  var reflectionForm = document.getElementById('reflectionForm');
  if (reflectionForm) {
    reflectionForm.addEventListener('submit', function (event) {
      event.preventDefault();
      localStorage.setItem(reflectionKey, JSON.stringify({
        win: weeklyWin.value.trim(),
        lesson: weeklyLesson.value.trim(),
        focus: weeklyFocus.value.trim(),
        savedAt: new Date().toISOString()
      }));
      reflectionStatus.textContent = 'Saved privately on this device.';
      window.setTimeout(function () {
        reflectionStatus.textContent = '';
      }, 3500);
    });
  }

  var guestbookKey = 'basanta-local-guestbook-v1';
  var guestbookForm = document.getElementById('localGuestbook');
  var guestName = document.getElementById('guestName');
  var guestMessage = document.getElementById('guestMessage');
  var guestbookStatus = document.getElementById('guestbookStatus');

  try {
    var savedGuestbook = JSON.parse(localStorage.getItem(guestbookKey)) || {};
    if (guestName) guestName.value = savedGuestbook.name || '';
    if (guestMessage) guestMessage.value = savedGuestbook.message || '';
  } catch (error) {}

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', function (event) {
      event.preventDefault();
      localStorage.setItem(guestbookKey, JSON.stringify({
        name: guestName.value.trim(),
        message: guestMessage.value.trim(),
        savedAt: new Date().toISOString()
      }));
      guestbookStatus.textContent = 'Saved only on this device.';
      window.setTimeout(function () {
        guestbookStatus.textContent = '';
      }, 3500);
    });
  }

});