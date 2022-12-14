import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

function TeacherFormLayout(props) {
  return (
    <Card>
      <MDBox p={2.4}>
        <Grid spacing={1.6} container>
          <Grid item xs={12}>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h5">
                {i18n('teacher.subTitle.profileData')}
              </MDTypography>
              <MDTypography
                variant="button"
                color="text"
                fontWeight="bold"
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Grid spacing={1.6} container>
              <Grid item md={4} xs={12}>
                <ImagesFormItem
                  name="avatars"
                  label={i18n('user.fields.avatars')}
                  storage={
                    Storage.values.userAvatarsProfiles
                  }
                  max={1}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <Grid container spacing={1.6}>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="firstName"
                      label={i18n('user.fields.firstName')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="lastName"
                      label={i18n('user.fields.lastName')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DatePickerFormItem
                      name="birthday"
                      label={i18n('user.fields.birthday')}
                      required={true}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="phoneNumber"
                      label={i18n(
                        'user.fields.phoneNumber',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="RFC"
                      label={i18n('user.fields.RFC')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="CURP"
                      label={i18n('user.fields.CURP')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextAreaFormItem
                      name="comment"
                      label={i18n('user.fields.comment')}
                      required={false}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="email"
                      label={i18n('user.fields.email')}
                      required={true}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="password"
                      label={i18n('user.fields.password')}
                      required={true}
                      variant="standard"
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default TeacherFormLayout;
