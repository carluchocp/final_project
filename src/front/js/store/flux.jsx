const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			urlBase: "http://127.0.0.1:3001/api",
			urlSignUp: "/signup",
			urlLogin: "/login",

			users: [],
			tokens: localStorage.getItem("token") || "",

			profiles: {},
			posts: [],
			saveds: []
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
							tokens: data.token
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
			},
			setPost: async(post) => {
				let store = getStore()
				console.log("me ejecuto")
				console.log(post)
				try {
					let response = await fetch(`${store.urlBase}/newpost`, {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${store.tokens}`,
						},
						body: post,
					})
					if (response.ok) {
						let data = await response.json()
						getActions().getPosts()
						return true
					} else {
						return false
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},
			getPosts: async() => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/feed`, {
						headers:{
							Authorization: `Bearer ${store.tokens}`
						}
					});
					const data = await response.json();
					if (!response.ok) {
						throw new Error("getPosts error")
					}
					setStore({
						...store,
						posts: data,
					});
				} catch (error) {
					console.log("getPosts Error", error);
				}
			},
			uploadImg: async(post) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/feed`, {
						method: "POST",
						mode: "no-cors",
						body: "product",
					});
					getActions().getPosts();
				} catch (error) {
					console.log("upload image Error", error);
				  }
			},
			getProfiles: async() => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/main/profile`, {
						headers:{
							Authorization: `Bearer ${store.tokens}`
						}
					});
					const data = await response.json();
					console.log(data)
					if (!response.ok) {
						throw new Error("getProfiles error")
					}
					setStore({
						...store,
						profiles: data,
					});
				} catch (error) {
					console.log("getProfiles Error", error);
				  }
			},
			updateProfile: async(profile) => {
				let store = getStore()
				console.log("me ejecuto")
				console.log(profile)
				try {
					let response = await fetch(`${store.urlBase}/profile`, {
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${store.tokens}`,
						},
						body: profile,
					})
					if (response.ok) {
						let data = await response.json()
						getActions().getProfiles()
						return true
					} else {
						return false
					}
				} catch (error) {
					console.log(`Error: ${error}`)
				}
			},
			uploadProfileImg: async(profile) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/main/profile`, {
						method: "POST",
						mode: "no-cors",
						body: "product",
					});
					getActions().getProfiles();
				} catch (error) {
					console.log("getPosts Error", error);
				  }
			},
			deletePost: async() => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/main`, {
						method: "DELETE",
					});
					getActions().getPosts();
				} catch (error) {
					console.log("deletePosts Error", error);
				  }
			},
			addSaveds: (item) => {
				const store = getStore()
				const exist = store.saveds.find((saved) => saved.created == item.created)
				if(!exist){
					setStore({
						...store,
						saveds: [...store.saveds, item] 
					})
				}else{
					const updatedSaveds = store.saveds.filter((saved) => saved.created != item.created) 
					setStore({
						...store,
						saveds: updatedsaveds
					})
				}
			},
			searchProfiles: async(profiles) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/search/users`, {
						method: 'POST', 
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(profiles), 
					});
					
					if (response.ok) {
						let data = await response.json()
						console.log(data)
						return data
					} else {
						throw new Error("searchUsers error")
						return false
					}
					
				} catch (error) {
					console.log("searchUsers Error", error);
				}
			},
			searchPosts: async(posts) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/search/posts`, {
						method: 'POST', 
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(posts), 
					});
					console.log(response)
					if (response.ok) {
						let data = await response.json()
						console.log(data)
						setStore({
						...store,
						posts: data
						})
						return true
					} else {
						throw new Error("searchPosts error")
					}
					
				} catch (error) {
					console.log("searchPosts Error", error);
				}
			},
			getMainPosts: async() => {
				const store = getStore()
				try {
					const response = await fetch(`${store.urlBase}/main`, {
						headers:{
							Authorization: `Bearer ${store.tokens}`
						}
					});
					const data = await response.json();
					if (!response.ok) {
						throw new Error("getPosts error")
					}
					setStore({
						...store,
						posts: data,
					});
				} catch (error) {
					console.log("getPosts Error", error);
				}
			}
		}
	};
};


export default getState;
