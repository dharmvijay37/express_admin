/* eslint-env browser */
$(document).ready(() => {
  $('#loginForm').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      },
    },
    messages: {
      email: {
        required: 'EMAIL is required!',
        email: 'Please enter valid EMAIL address!'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });

  $('#forgot-password').validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      email: {
        required: 'EMAIL is required!',
        email: 'Please enter valid EMAIL address!'
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });

  $('#reset-password').validate({
    rules: {
      password: {
        password: true,
        required: true
      },
      confirmPassword: {
        password: true,
        required: true,
        equalTo: '#password'
      }
    },
    messages: {
      password: {
        password: 'Please enter a secure PASSWORD. '
          + 'A strong PASSWORD contains at least 8 characters, '
          + 'uppercase and lowercase letters, and numbers and special characters!',
        required: 'PASSWORD is required!'
      },
      confirmPassword: {
        required: 'CONFIRM PASSWORD is required!',
      }
    },
    errorElement: 'span',
    errorLabelContainer: '.error',
    submitHandler: (form) => {
      form.submit();
    }
  });
});
