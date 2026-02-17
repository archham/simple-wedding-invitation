/**
 * CountDown Clock
 * Version   : 1.1.0
 * Original  : Ekrem KAYA (https://e-piksel.com)
 * GitHub    : https://github.com/epiksel/countdown
 * Modified  : Translated to English defaults
 */

(function($) {
  'use strict';

  $.fn.countdown = function(options, callback) {
    const settings = $.extend({
      date: null,
      offset: null,
      day: 'Day',
      days: 'Days',
      hour: 'Hour',
      hours: 'Hours',
      minute: 'Minute',
      minutes: 'Minutes',
      second: 'Second',
      seconds: 'Seconds'
    }, options);

    // Throw error if date is not set
    if (!settings.date) {
      $.error('Date is not defined.');
    }

    // Throw error if date is set incorrectly
    if (!Date.parse(settings.date)) {
      $.error('Incorrect date format, it should look like this: 12/24/2012 12:00:00.');
    }

    const container = this;

    /**
     * Change client's local date to match offset timezone
     * @return {Date} Fixed Date object.
     */
    const getCurrentDate = () => {
      const date = new Date();
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      return new Date(utc + (3600000 * settings.offset));
    };

    /**
     * Pad number with leading zero
     * @param {number} num - Number to pad
     * @return {string} Padded number string
     */
    const padNumber = (num) => String(num).padStart(2, '0');

    /**
     * Main countdown function that calculates everything
     */
    const updateCountdown = () => {
      const targetDate = new Date(settings.date);
      const currentDate = getCurrentDate();
      const difference = targetDate - currentDate;

      // If difference is negative, the target date has passed
      if (difference < 0) {
        clearInterval(interval);
        if (callback && typeof callback === 'function') {
          callback();
        }
        return;
      }

      // Time unit constants
      const SECOND = 1000;
      const MINUTE = SECOND * 60;
      const HOUR = MINUTE * 60;
      const DAY = HOUR * 24;

      // Calculate time units
      const days = Math.floor(difference / DAY);
      const hours = Math.floor((difference % DAY) / HOUR);
      const minutes = Math.floor((difference % HOUR) / MINUTE);
      const seconds = Math.floor((difference % MINUTE) / SECOND);

      // Get appropriate text (singular/plural)
      const textDays = (days === 1) ? settings.day : settings.days;
      const textHours = (hours === 1) ? settings.hour : settings.hours;
      const textMinutes = (minutes === 1) ? settings.minute : settings.minutes;
      const textSeconds = (seconds === 1) ? settings.second : settings.seconds;

      // Update DOM
      container.find('.days').text(padNumber(days));
      container.find('.hours').text(padNumber(hours));
      container.find('.minutes').text(padNumber(minutes));
      container.find('.seconds').text(padNumber(seconds));

      container.find('.days_text').text(textDays);
      container.find('.hours_text').text(textHours);
      container.find('.minutes_text').text(textMinutes);
      container.find('.seconds_text').text(textSeconds);
    };

    // Start the countdown
    const interval = setInterval(updateCountdown, 1000);
    
    // Run immediately
    updateCountdown();
  };

})(jQuery);