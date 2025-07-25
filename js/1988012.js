const API = 'https://web1-api.vercel.app/api';
const AUTHENTICATE_API = 'https://web1-api.vercel.app/users';

// Function to handle loading data from the API
async function loadData(request, templateId, viewId) {
        const response = await fetch(`${API}/${request}`);
        const dataFromApi = await response.json();
        // console.log(dataFromApi);

        var source = document.getElementById(templateId).innerHTML;
        var template = Handlebars.compile(source);

        var context = { data: dataFromApi };
        var html = template(context);
        // console.log(html);

        var view = document.getElementById(viewId);
        // console.log(view)
        view.innerHTML = html;
      };

      // Function to handle authentication
async function getAuthenticateToken(username, password) {
        let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        return data.token;
      }

// Function to handle login
async function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  document.getElementById('errorMessage').innerHTML = ''; // Clear previous error message

  try {
    const token = await getAuthenticateToken(username, password);
    if (token) {
      localStorage.setItem('token', token);
      console.log('Login successful, token:', token);
      document.getElementsByClassName('btn-close')[0].click(); // Close the modal
      displayControls();
    }
    
    document.getElementById('errorMessage').innerHTML = 'Login successful!';
    // Optionally, you can redirect or update the UI here
  } catch (error) {
    document.getElementById('errorMessage').innerHTML = 'Login failed: ' + error;
    displayControls(false);
  }
}
// Function to display controls based on authentication status
function displayControls(isLogin = true) {
  let linkLogins = document.getElementsByClassName('linkLogin');
  let linkLogouts = document.getElementsByClassName('linkLogout');

  let displayLogin = isLogin ? 'none' : 'block';
  let displayLogout = isLogin ? 'block' : 'none';

  for (let i = 0; i < linkLogins.length; i++) {
    linkLogins[i].style.display = displayLogin;
    linkLogouts[i].style.display = displayLogout; 
  }
}

// Function to check if the user is logined
async function checkLogin() {  
  let isLogin = await verifyToken();
  displayControls(isLogin);
  console.log(isLogin);
}

// Function to verify the token
async function verifyToken() {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    let response = await fetch(`${AUTHENTICATE_API}/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            }});
    if (response.status === 200) {      
        return true; // Token is valid   
    } else {
      return false; // Token is invalid
    }
  } else {
    return false; // No token found
  }
}

// Function to handle logout
function logout() {
  localStorage.removeItem('token');
  displayControls(false);
  document.getElementById('errorMessage').innerHTML = 'You have logged out successfully!';
  // Optionally, you can redirect or update the UI here
}