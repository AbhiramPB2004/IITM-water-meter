import { useState } from 'react';
import './App.css';
import { 
  MDBCol, 
  MDBContainer, 
  MDBRow, 
  MDBCard,
  MDBCardText, 
  MDBCardBody, 
  MDBCardImage, 
  MDBBtn, 
  MDBBreadcrumb, 
  MDBBreadcrumbItem, 
  MDBProgress, 
  MDBProgressBar,
  MDBIcon, 
  MDBListGroup, 
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
  const[Name,setName] = useState("Abhiram PB");
  const[Email,setEmail] = useState("abhirampb9@gmail.com");
  const[Phone,setPhone] = useState("+91-7337695314");
  const[Address,setAddress] = useState("Kerala, India");
  const[Skill1,setSkill1] = useState("Web Design");
  const[Skill2,setSkill2] = useState("Python");
  const[Skill3,setSkill3] = useState("Java Script");
  const[Skill4,setSkill4] = useState("Machine Learning");
  const[Skill5,setSkill5] = useState("Backend API");
  const[PersonalSkill1,setPersonalSkill1] = useState("Leadership");
  const[PersonalSkill2,setPersonalSkill2] = useState("Critical-thinking skills");
  const[PersonalSkill3,setPersonalSkill3] = useState("Analytical skills");
  const[PersonalSkill4,setPersonalSkill4] = useState("Creativity");
  const[PersonalSkill5,setPersonalSkill5] = useState("Resilience");
  const[Website,setWebsite] = useState("NONE");
  const[Github,setGithub] = useState("https://github.com/AbhiramPB2004");
  const[Twitter,setTwitter] = useState("https://twitter.com/abhiram_pb");
  const[Instagram,setInstagram] = useState("Deactivated");
  const[Facebook,setFacebook] = useState("none");
  const[LinkedIn,setLinkedIn] = useState("Abhiram PB");
  const[Education,setEducation] = useState("B.Tech in Computer Science and Engineering");
  const[JobRecommendations1,setJobRecommendations1] = useState("Data Science Engineer");
  const[JobRecommendations2,setJobRecommendations2] = useState("AI ML Engineer");
  const[JobRecommendations3,setJobRecommendations3] = useState("Full Stack Developer");
  const[JobRecommendations4,setJobRecommendations4] = useState("Software Developer");
  const[JobRecommendations5,setJobRecommendations5] = useState("Frontend Developer");
  const[CompanyRecommendations1,setCompanyRecommendations1] = useState("Google");
  const[CompanyRecommendations2,setCompanyRecommendations2] = useState("Microsoft");
  const[CompanyRecommendations3,setCompanyRecommendations3] = useState("Amazon");
  const[CompanyRecommendations4,setCompanyRecommendations4] = useState("Facebook");
  const[CompanyRecommendations5,setCompanyRecommendations5] = useState("TCS");


  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">CSE Student</p>
                <p className="text-muted mb-4">{Address}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }}  />
                    <MDBCardText><a href={Github}>{Github}</a></MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText><a href={Twitter}>{Twitter}</a></MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>{Instagram}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>{Facebook}</MDBCardText>
                  </MDBListGroupItem>
                  {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="linkedin fa-lg" style={{ color: '#0077b5' }} />
                    <MDBCardText><a href={LinkedIn}>{LinkedIn}</a></MDBCardText>
                  </MDBListGroupItem> */}
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="linkedin fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText><a href='https://www.linkedin.com/in/abhiram-p-b-6bb9ba255/'>{LinkedIn}</a></MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
            <MDBCol> 
              <MDBCard className="mb-4">
                <MDBCardBody>
                <div className="d-flex justify-content-center mb-2">
                <MDBBtn>EDIT Profile</MDBBtn>
                </div>
                </MDBCardBody>
                <MDBBtn >Re-Assesment</MDBBtn>
                </MDBCard>
            </MDBCol>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Current Education</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Education}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Proffesional Skill Set</span> </MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>{Skill1}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={60} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{Skill2}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{Skill3}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{Skill4}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{Skill5}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Personal Skill set</span></MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>{PersonalSkill1}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{PersonalSkill2}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{PersonalSkill3}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{PersonalSkill4}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{PersonalSkill5}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>

              </MDBCol>
              <div className='padding'></div>
              
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Job Recomendations</span></MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>{JobRecommendations1}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{JobRecommendations2}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{JobRecommendations3}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{JobRecommendations4}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{JobRecommendations5}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Company Recomendations</span></MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>{CompanyRecommendations1}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={90} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{CompanyRecommendations2}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={82} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{CompanyRecommendations3}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={79} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{CompanyRecommendations4}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{CompanyRecommendations5}</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={86} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>

              </MDBCol>
            </MDBRow>
          
          </MDBCol>
          
        
        </MDBRow>
        
      </MDBContainer>
      

      
      
    </section>
  );
}