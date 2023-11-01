const Profile = ({ params }: { params: { id: string } }) => {

    console.log(params.id)
    return <div>
        <p>PROFILE</p>
    </div>
};

export default Profile;
