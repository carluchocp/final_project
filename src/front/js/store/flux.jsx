const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			urlBase: "http://127.0.0.1:3001/api",
			urlSignUp: "/signup",
			urlLogin: "/login",

			users: [],
			tokens: localStorage.getItem("token") || ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			signUpCredentials: (user) => {
				console.log("me estoy validando")
				if (user.username == undefined ||
					user.name == undefined ||
					user.lastname ||
					user.age ||  
					user.email == undefined || 
					user.password == undefined){
					return false
				} else {
					if (user.username.trim() != "" &&
					user.username.length <= 12 &&
					user.name.trim() != "" &&
					user.lastname.trim() != "" &&
					user.age.trim() != "" &&
					user.email.trim() != "" &&
					(user.email.includes("@gmail.com") || user.email.includes("@hotmail.com")) &&
					user.password.trim() != "" &&
					user.password.length >= 8) {
						return true
					} else {
						return false
					}
				}
			},
			logInCredentials: (user) => {
				if (user.email.trim() != "" && user.password.trim() != "") {
					return true
				} else {
					return false
				}
			},
			userPrivate: async() => {
				let store = getStore();
				try {
					let response = await fetch(`${urlBase}${urlPrivate}`, {
						method: 'GEt',
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${store.tokens}`,
						},
						body: JSON.stringify(),
					})
					if (response.ok) {
						const data = await response.json()
						setStore({
							users: data
						});
						return true
					} else {
						return false
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},
			userSignUp: async(user) => {
				let store = getStore()
				console.log("me ejecuto")
				try {
					let response = await fetch(`${store.urlBase}${store.urlSignUp}`, {
						method: 'POST',
						headers: {
							"Content-Type":"application/json",
						},
						body: JSON.stringify(user),
					})
					if (response.ok) {
						return true
					} else {
						return false
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},
			userLogIn: async(user) => {
				let store = getStore()
				try {
					let response = await fetch(`${store.urlBase}${store.urlLogin}`, {
						method: 'POST', 
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user), 
					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							token: data.token
						})
						localStorage.setItem("token", data.token)
						return true
					} else {
						return false
					}
				} catch (error){
					console.log(`Error: ${error}`)
				}
			},
			userLogOut: () => {
				localStorage.removeItem("token"),
				setStore({
					token: ""
				})
			}
		}
	};
};

export default getState;
