import { Fluent } from '../src'

describe('Fluent', () => {
	test('AttributesAreSetByConstructor', () => {
		const obj = {
			name: 'John',
			age: 25,
		}

		const fluent = Fluent(obj)

		expect(fluent.getAttributes()).toBe(obj)
	})

	test('GetMethodReturnsAttribute', () => {
		const fluent = Fluent({
			name: 'John',
		})

		expect(fluent.get('name')).toBe('John')
		expect(fluent.get('foo', 'Default')).toBe('Default')
		expect(fluent.name).toBe('John')
		expect(fluent.foo).toBeInstanceOf(Function)
	})

	test('ArrayAccessToAttributes', () => {
		const fluent = Fluent({ attributes: 1 })

		expect(typeof fluent.attributes !== 'undefined').toBeTruthy()
		expect(fluent['attributes']).toBe(1)
	})

	test('MagicMethodsCanBeUsedToSetAttributes', () => {
		const fluent = Fluent()

		fluent.name = 'John'
		fluent.developer()
		fluent.age(25)

		expect(fluent.name).toBe('John')
		expect(fluent.developer).toBe(true)
		expect(fluent.age).toBe(25)
		expect(fluent.programmer).toBeInstanceOf(Function)
	})

	test('IssetMagicMethod', () => {
		const fluent = Fluent({ name: 'John', age: 25 })

		expect(typeof fluent.name !== 'undefined').toBeTruthy()
		expect(fluent.name).toBe('John')

		delete fluent.name

		expect(typeof fluent.name === 'function').toBeTruthy()
		expect(fluent.name).toBeInstanceOf(Function)
	})

	test('ToArrayReturnsAttribute', () => {
		const obj = { name: 'John', age: 25 }

		const fluent = Fluent(obj)

		expect(fluent.getAttributes()).toBe(obj)
	})

	test('ToJsonEncodesTheToArrayResult', () => {
		const obj = { name: 'John', age: 25 }

		const fluent = Fluent(obj)

		fluent.demo()

		expect(fluent.toJson()).toBe(JSON.stringify(obj))
	})
})
