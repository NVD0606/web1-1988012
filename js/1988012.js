const API = 'https://web1-api.vercel.app/api';

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