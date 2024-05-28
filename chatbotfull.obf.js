import Chatbot from "./web.obf.js";

// Fonction pour récupérer les données de l'API
async function fetchChatbotConfig(configUrl) {
	try {
		let response = await fetch(configUrl);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		let data = await response.json();
		const chatbotConfig = JSON.parse(data.chatbotConfig);
		console.log("chatbotConfig:", chatbotConfig);
		return chatbotConfig;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de la configuration:",
			error
		);
	}
}

// Fonction pour insérer le composant chatbot dans le body
function addChatbotElement() {
	const chatbotElement = document.createElement("lexik-fullchatbot");
	document.body.appendChild(chatbotElement);
}

// Variables pour apiUrl et chatbotId
let apiUrl;
let chatbotId;
let scriptTagChatBot = document.querySelector("script[chatbotId]");
let scriptTagHost = document.querySelector("script[apiUrl]");

if (scriptTagChatBot) {
	chatbotId = scriptTagChatBot.getAttribute("chatbotId");
} else {
	console.log(
		"Aucun attribut trouvé. Veuillez ajouter l'attribut 'chatbotId'"
	);
}

if (scriptTagHost) {
	apiUrl = scriptTagHost.getAttribute("apiUrl");
} else {
	console.log("Aucun attribut trouvé. Veuillez ajouter l'attribut 'apiUrl'");
}

// On retire les marges et paddings du body
document.body.style.margin = "0";
document.body.style.padding = "0";

// Récupérer la configuration et initialiser le Chatbot
const configUrl = apiUrl + "/api/v1/public-chatflows/" + chatbotId;
if (apiUrl && chatbotId) {
	fetchChatbotConfig(configUrl).then((config) => {
		if (config) {
			addChatbotElement();
			Chatbot.initFull({
				chatflowid: chatbotId,
				apiHost: apiUrl,
				theme: {
					chatWindow: {
						showTitle: true,
						title: config.title || "Lexik",
						titleAvatarSrc:
							config.titleAvatarSrc ||
							"https://www.algos.fr/wp-content/uploads/2024/04/cropped-algos-favicon-agenceia.png",
						welcomeMessage:
							config.welcomeMessage ||
							"Bonjour 😊 ! Je suis l'intelligence artificielle d'Algos.",
						backgroundColor: config.backgroundColor || "#ffffff",
						fontSize: config.fontSize || 16,
						poweredByTextColor:
							config.poweredByTextColor || "#303235",
					},
					botMessage: {
						showAvatar: config.botMessage.showAvatar,
						backgroundColor: config.botMessage.backgroundColor,
						textColor: config.botMessage.textColor,
					},
					userMessage: {
						showAvatar: config.userMessage.showAvatar,
						backgroundColor: config.userMessage.backgroundColor,
						textColor: config.userMessage.textColor,
					},
					textInput: {
						backgroundColor: config.textInput.backgroundColor,
						textColor: config.textInput.textColor,
						sendButtonColor: config.textInput.sendButtonColor,
					},
					overrideConfig: config.overrideConfig,
				},
			});
		}
	});
} else {
	console.log("L'url de l'API ou l'identifiant du chatbot n'est pas défini.");
}
