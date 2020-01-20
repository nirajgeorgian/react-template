import localForage from 'localforage'

// creating configuration for localstorage
localForage.config({
	driver: localForage.WEBSQL,
	name: 'stayology',
	version: 1.0,
	size: 4980736,
	storeName: 'stayology_store',
	description: 'stayology store'
})

// create a local instance of localforage
const localforage = localForage.createInstance({
	name: 'stayology-localstorage'
})

// export default to make use of it throughout different modules in application
export default localforage
