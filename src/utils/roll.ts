/*
 * Roll for http request with network error
 * Now do nothing
 * Will do something in request method
 * Not only callback in response method, but also check hook method
 */

// import interface from uni d.ts
import RequestOptions = UniNamespace.RequestOptions
const Roll = {
	request(id: string, option: RequestOptions, calllback: Function) {
		// do something with this project

		// @ts-ignore
		if (this[id]) {

		} else {
			// @ts-ignore
			this[id] = calllback
		}
	},
	response(id: string, res: any) {
		// can check hook with this project

		// @ts-ignore
		if (this[id]) this[id](res)
	}
}

export default Roll
