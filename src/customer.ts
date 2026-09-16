import {
    Customer,
    Guest,
    Member,
    MembershipLevel,
    Address,
} from "./types";

export function createGuest(
    id: number,
    name: string,
    address: Address,
    phone?: string
): Guest {
    return{
        id,
        name,
        address,
        phone,
        type: "guest",
    };
}

export function createMember(
    id: number,
    name: string,
    address: Address,
    membershipLevel: MembershipLevel,
    phone?:string
): Member {
    const discountMap: Record<MembershipLevel, number> ={
        silver: 5,
        gold: 10,
        platinum: 15,
    };

    return {
        id,
        name,
        address,
        phone,
        type: "member",
        membershipId: `MEM-${id}`,
        membershipLevel,
        discountPercentage: discountMap[membershipLevel],
    };
}

export function getCustomerDiscount(customer: Customer): number {
    if(customer.type === "member"){
        return customer.discountPercentage;
    }

    return 0;
}

