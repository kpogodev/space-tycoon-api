export interface Agent {
    accountId: string
    symbol: string
    headquarters: string
    credits: number
    startingFaction: string
    shipCount: number
}

export interface ContractTermPayment {
    onAccepted: number
    onFulfilled: number
}

export interface ContractTermDeliverItem {
    tradeSymbol: string
    destinationSymbol: string
    unitsRequired: number
    unitsFulfilled: number
}

export interface ContractTerms {
    deadline: string
    payment: ContractTermPayment
    deliver: ContractTermDeliverItem[]
}

export interface Contract {
    id: string
    factionSymbol: string
    type: string
    terms: ContractTerms
    accepted: boolean
    fulfilled: boolean
    expiration: string
    deadlineToAccept: string
}

export interface FactionTrait {
    symbol: string
    name: string
    description: string
}

export interface Faction {
    symbol: string
    name: string
    description: string
    headquarters: string
    traits: FactionTrait[]
    isRecruiting: boolean
}

export interface Route {
    destination: Destination
    departure: Departure
    departureTime: string
    arrival: string
}

export interface Destination {
    symbol: string
    type: string
    systemSymbol: string
    x: number
    y: number
}

export interface Departure extends Destination {}

export interface Crew {
    current: number
    required: number
    capacity: number
    rotation: string
    morale: number
    wages: number
}

export interface ShipComponentRequirements {
    power: number
    crew: number
    slots: number
}

export interface ShipComponent {
    symbol: string
    name: string
    description: string
    condition: number
    requirements: ShipComponentRequirements
}

export interface Module extends ShipComponent {
    capacity: number
    range: number
}

export interface Mount extends ShipComponent {
    strength: number
    deposits: string[]
}

export interface CargoItem {
    symbol: string
    name: string
    description: string
    units: number
}

export interface Cargo {
    capacity: number
    units: number
    inventory: CargoItem[]
}

export interface Fuel {
    current: number
    capacity: number
    consumed: {
        amount: number
        timestamp: string
    }
}

export interface Ship {
    symbol: string
    registration: Registration
    nav: Nav
    crew: Crew
    frame: Frame
    reactor: Reactor
    engine: Engine
    modules: Module[]
    mounts: Mount[]
    cargo: Cargo
    fuel: Fuel
}

export interface Registration {
    name: string
    factionSymbol: string
    role: string
}

export interface Nav {
    systemSymbol: string
    waypointSymbol?: string
    route: Route
    status: string
    flightMode: string
}

export interface Frame extends ShipComponent {
    moduleSlots: number
    mountingPoints: number
    fuelCapacity: number
}

export interface Reactor extends ShipComponent {
    powerOutput: number
}

export interface Engine extends ShipComponent {
    speed: number
}

export interface DataResponse {
    data: {
        agent: Agent
        contract: Contract
        faction: Faction
        ship: Ship
        token: string
    }
}
