import * as React from "react";
import { MemberEntity } from "../../model/member";
import { memberAPI } from "../../api/memberAPI";
import { MemberRow } from "./memberRow";
import { MemberHead } from "./memberHead";
import { Theme, makeStyles } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import { blue, yellow } from '@material-ui/core/colors';


interface Props {
}


const useStyles = makeStyles((theme:Theme) => ({
  input: {
    margin: theme.spacing,
  },
  button: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
  headTable: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
}))

export const MembersTableComponent = (props: Props) => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organization, setCurrentOrganization] = React.useState<string>("lemoncode");
  const [title, setTitle] = React.useState<string>("Enter your organization !!");
  

  const onChangeName = (event) => {
    setCurrentOrganization(event.target.value);
  }

  const checkHandleOrganization = () => {
    if(organization == ""){
      setCurrentOrganization("lemoncode");
    }
  }
  
  const loadMembers = (organization) => {
    checkHandleOrganization();
    
    memberAPI.getAllMembers(organization)
          .then(members => setMembers(members));
    setTitle(organization)
  };

  const userOrganizationClasses = useStyles(props);

  return (
    <div className="row">
      <h2> {title} </h2>
      <div>
      <Input value={organization} onChange={onChangeName} className={userOrganizationClasses.input} />
      <button className={userOrganizationClasses.button} color="primary" onClick={() => loadMembers(organization)}>
        Load
        </button>
        </div>
      <table className="table">
        <thead className={userOrganizationClasses.headTable}>
          <MemberHead />
        </thead>
        <tbody>
          {members.map((member: MemberEntity) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
