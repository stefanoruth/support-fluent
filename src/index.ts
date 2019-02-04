interface LooseObject {
	[key: string]: any
}

export function Fluent(data: any = {}) {
	return FluentObject.proxy(data)
}

class FluentObject implements LooseObject {
	attributes: any = {}

	constructor(attributes: any = {}) {
		this.attributes = attributes
	}

	getAttributes() {
		return this.attributes
	}

	set(key: string, value: any) {
		this.attributes[key] = value
	}

	has(key: string): boolean {
		return !!this.attributes[key]
	}

	get(key: string, defaultValue: any = null) {
		if (this.attributes[key]) {
			// console.log('exists', key)
			return this.attributes[key]
		}

		// console.log('not there')
		return defaultValue
	}

	toJson(): string {
		return JSON.stringify(this.attributes)
	}

	static proxyHandler() {
		return {
			get: (target: any, name: string, receiver: any): any => {
				// console.log(target, name)
				if (typeof target[name] === 'function') {
					// console.log('method', name)
					return target[name]
				} else if (target.has(name)) {
					return target.get(name)
				} else if (target[name]) {
					return target[name]
				}

				return (value: any = true) => {
					target.set(name, value)
				}
			},
			set: (target: any, name: string, value: any): any => {
				// console.log(target, name, value)
				target.set(name, value)
				return true
			},
			deleteProperty: (target: any, prop: string): boolean => {
				delete target.attributes[prop]
				return true
			},
			__noSuchMethod__: (name: string, args: any) => {
				console.log(name, args)
				return () => {
					return true
				}
			},
		}
	}

	static proxy(data: any = {}) {
		return new Proxy(new FluentObject(data), FluentObject.proxyHandler())
	}
}
