


export const Roles={
    admin:"ADMIN",
    user:"USER"
} as const

export type TRole=typeof Roles[keyof typeof Roles]