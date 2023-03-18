interface User {
    account_badges: any[];
    full_name: string;
    has_anonymous_profile_picture: boolean;
    is_favorite: boolean;
    is_private: boolean;
    is_verified: boolean;
    latest_reel_media: number;
    pk: number;
    pk_id: string;
    profile_pic_id: string;
    profile_pic_url: string;
    strong_id__: string;
    username: string;
}

export default User;
