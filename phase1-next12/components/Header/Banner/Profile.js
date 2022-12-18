import { useEffect, useState } from "react"
import { useLoginStore } from "../../../stores/loginStore"
import { studentService } from "../../../services/student-service"
const _staff = require('../../../data/staff.json')


export default function Profile() {
    const [profile, setProfile] = useState({})
    const userContext = useLoginStore(state => state.userContext)

    useEffect(() => {
        if (userContext.role == 'parent') {
            studentService.getAll().then(res => {
                const parent = res.find(s => s.id == userContext.id).parent
                setProfile({ firstName: parent.firstName, lastName: parent.lastName })
            })
        } else if(userContext.role == 'coordinator' || userContext.role == 'teacher' ){
            const staff = _staff.find(s => s.staffNo == userContext.id)
            setProfile({ firstName: staff.firstName, lastName: staff.lastName })
        }
    }, [userContext])

    return (
        <>
            <h3 style={{
                color: "#FAF9F6",
                letterSpacing: "2px",
            }}>
                <i
                    className="fa fa-user"
                    style={{
                        fontSize: "18px",
                        color: "#FAF9F6",
                        marginRight: "10px",
                    }}
                ></i>
                {profile.lastName}, {profile.firstName}</h3>
        </>)
}