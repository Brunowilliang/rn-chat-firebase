/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Categories = "categories",
	Transactions = "transactions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CategoriesRecord = {
	userId?: RecordIdString
	name?: string
}

export type TransactionsRecord = {
	userId?: RecordIdString
	name?: string
	categoryId?: RecordIdString
	price?: number
	type?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CategoriesResponse<Texpand = unknown> = CategoriesRecord & BaseSystemFields<Texpand>
export type TransactionsResponse<Texpand = unknown> = TransactionsRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	categories: CategoriesRecord
	transactions: TransactionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	categories: CategoriesResponse
	transactions: TransactionsResponse
	users: UsersResponse
}