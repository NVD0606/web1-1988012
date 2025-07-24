const API = 'https://web1-api.vercel.app/api';
const AUTHENTICATE_API = 'https://web1-api.vercel.app/users';

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