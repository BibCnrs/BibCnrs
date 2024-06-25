export const translation = {
	fr: {
		login: "identifiant",
		password: "mot de passe",
		title: "Bienvenue",
		info: "La ressource ou le service souhaité est réservé aux ayants droit du CNRS. Pour y accéder il est nécessaire de s'identifier.",
		connection: "Connexion",
		janus: "Connectez-vous via janus",
		inistAccount: "Code d'accès de votre unité",
		askAccount: "Demander un compte janus",
		or: "ou",
		janusExplanation:
			"Compte personnel pour l'ensemble des services du CNRS : Agate, Simbad...",
		401: `L'identifiant/mot de passe saisi n'a pas permis de vous connecter au portail, veuillez essayer à nouveau en majuscule sans espace.
Si le problème persiste, n'hésitez pas à contacter assistance-portail@inist.fr`,
	},
	en: {
		login: "login",
		password: "password",
		title: "Welcome",
		info: "The resource or service is reserved for CNRS rights holders. Please sign in.",
		connection: "Connection",
		janus: "Connect with janus",
		inistAccount: "Unit access code",
		askAccount: "Request a janus account",
		or: "or",
		janusExplanation:
			"Personal account for all CNRS services Agate, Simbad ...",
		401: `The username / password is wrong. Please try again (in capital letters without spaces).
If the problem persists, do not hesitate to contact assistance-portail@inist.fr`,
	},
};

export function loginTemplate(language: string, error?: string) {
	const text = translation[language];

	return `<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
        theme: {
            extend: {
                colors: {
                    bibcnrs: '#6941EB',
                    bibcnrsLight: '#c8baf8',
                    bibcnrsDark: '#4818e7',
                    bibcnrsBackground: '#ede8fd',
                }
            }
        }
        }
    </script>
</head>

<body class="bg-bibcnrsBackground flex items-center justify-center min-h-screen">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 class="text-2xl font-semibold mb-6">${text.title}</h1>
        <p class="text-gray-500 mb-6">${text.info}</p>
        <button id="janus_connect" class="w-full h-[50px] bg-bibcnrs text-white py-2 rounded-md mb-4 hover:bg-bibcnrsDark">
            ${text.janus}
        </button>
       
        <a href="#" class="text-sm text-bibcnrs italic  block text-right mb-2">${text.askAccount}</a>
        <div class="inline-flex items-center justify-center w-full mb-2">
            <hr class="w-full h-px my-4 bg-gray-200 border-0">
            <span class="absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2">${text.or}</span>
        </div>


        <button id="bibapi_toggle" class="w-full border border-bibcnrs text-bibcnrs py-2 rounded-md mb-4 hover:bg-bibcnrs hover:bg-slate-50	">
            ${text.inistAccount}
        </button>

        <form role="form" method="post" id="login_form" class="form-signin hidden transform transition-opacity opacity-0 scale-95" >
            <input name="username" type="text" required class="w-full border border-bibcnrsLight rounded-md p-2 mb-4" placeholder=${text.login}>
            <input name="password" type="password" required class="w-full border border-bibcnrsLight rounded-md p-2 mb-4" placeholder=${text.password}>
            ${
							error
								? `<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
            </div>`
								: ""
						}
            <button class="w-full text-bibcnrs py-2 border-bibcnrs rounded-md hover:pointer">${text.connection}</button>
        </form>
    </div>
</body>

 <script type="text/javascript">
    (function () {
        document.getElementById("janus_connect").onclick = function() {
            document.location.href =(
                window.location.href.replace(new RegExp('/ezticket/login.*'), '') +
                '/ebsco/login_renater/?origin=' +
                encodeURIComponent(window.location.href.replace('/login', ''))
            );
        };

        document.getElementById('bibapi_toggle').addEventListener('click', function() {
            const form = document.getElementById('login_form');
            if (form.classList.contains('hidden')) {
                form.classList.remove('hidden');
                setTimeout(() => {
                    form.classList.remove('opacity-0', 'scale-95');
                    form.classList.add('opacity-100', 'scale-100');
                }, 10); // Timeout ensures the transition effect is applied after removing 'hidden'
            } else {
                form.classList.add('opacity-0', 'scale-95');
                setTimeout(() => {
                    form.classList.add('hidden');
                }, 300); // Match the timeout to the duration of the opacity transition
            }
        });
    })()
</script>

</html>`;
}
