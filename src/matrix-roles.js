module.exports = {
  Account: {
    View: { value: 'admin_user', description: 'view page account' },
    GetAll: { value: 'account_getall', description: 'can view account of all departments' },
    Create: { value: 'account_create', description: 'can create account' },
    Master: { value: 'account_master', description: 'this permission is important! can destroy system' },
    Edit: { value: 'account_edit', description: 'can edit, reset pass, block account' },
    Delete: { value: 'account_delete', description: 'can delete account' }
  },
  Client: {
    View: { value: 'client_view', description: 'view page client' },
    Create: { value: 'client_create', description: 'create client' },
    Edit: { value: 'client_edit', description: 'edit client' },
    Delete: { value: 'client_delete', description: 'delete client' }
  },
  DataEntry: {
    View: { value: 'de_lead_view', description: 'data entry view page lead data' },
    Create: { value: 'de_lead_create', description: 'data entry create app' },
    Edit: { value: 'de_lead_return', description: 'data entry comment and return app' },
    Admin: { value: 'de_lead_admin', description: 'data entry assign/unassign app' },
    Report: { value: 'de_report_view', description: 'data entry view page report and full action' }
  },
  Momo: {
    DataEntry: { value: 'momo_de_view', description: 'full action DE MoMo project' },
    DocumentCheck: { value: 'momo_dc_view', description: 'full action DC MoMo project' },
    LoanBooking: { value: 'momo_lb_view', description: 'full action Payment MoMo project' },
    AppStatus: { value: 'momo_as_view', description: 'review logs app' },
    ACCA: { value: 'momo_acca_view', description: 'review ACCA' }
  },
  Tool: {
    Repayment: { value: 'repayment_view', description: 'full action Repayment' },
    AutoAssign: { value: 'autoassign_view', description: 'full action Auto Assign' },
    CheckDedupe: { value: 'checkapp_view', description: 'full action Check Dedupe' },
    SmartNet: { value: 'smart_net_view', description: 'full action SmartNet' }
  },
  AutoRouting: {
    DE: { value: 'de_auto_routing_view', description: 'full action Auto Routing DE' },
    API: { value: 'de_auto_routing_api_view', description: 'full action Auto Routing API' },
  },
  AutoAllocation: {
    SupervisorView: { value: 'auto_allocation_supervisor_view', description: 'Allow access pages with mode supervisor in Auto-Allocation' },
    LeaderView: { value: 'auto_allocation_leader_view', description: 'Allow access pages with mode leader in Auto-Allocation' },
    UserView: { value: 'auto_allocation_user_view', description: 'Allow access pages with mode user in Auto-Allocation' },
    ConfigurationView: { value: 'auto_allocation_configuration_view', description: 'Allow access Configuration page in Auto-Allocation'},
    Create: { value: 'auto_allocation_create', description: 'Allow create action in Auto-Allocation'},
    Edit: { value: 'auto_allocation_edit', description: 'Allow edit action in Auto-Allocation' },
    Delete: { value: 'auto_allocation_delete', description: 'Allow delete action in Auto-Allocation'}
  },
  EForm: {
    SupervisorView: { value: 'eform_supervisor_view', description: 'Allow access pages with mode supervisor in E-FORM' },
    LeaderView: { value: 'eform_leader_view', description: 'Allow access pages with mode leader in E-FORM' },
    QALeaderView: { value: 'eform_qa_leader_view', description: 'Allow access pages with mode qa leader in E-FORM' },
    UserView: { value: 'eform_user_view', description: 'Allow access pages with mode user in E-FORM' },
    QAUserView: { value: 'eform_qa_user_view', description: 'Allow access pages with mode qa user in E-FORM' },
    SuportView: { value: 'eform_support_view', description: 'Allow access pages with mode support and just view excute actions in E-FORM' },
    Create: { value: 'eform_create', description: 'Allow create action in E-FORM'},
    Edit: { value: 'eform_edit', description: 'Allow edit action in E-FORM' },
    Delete: { value: 'eform_delete', description: 'Allow delete action in E-FORM'}
  },
  CMS: {
    // setting page 
    SettingsView: { value: 'cms_settings_view', description: 'config all value system cms' },
    // SchemeEdit: { value: 'cms_settings_scheme_edit', description: 'config all value system cms' },
    // ErrCodeCreate: { value: 'cms_settings_code_create', description: 'config all value system cms' },
    // ErrCodeEdit: { value: 'cms_settings_code_edit', description: 'config all value system cms' },
    // ErrCodeDelete: { value: 'cms_settings_code_delete', description: 'config all value system cms' },
    // StatusDefine: { value: 'cms_settings_scheme_edit', description: 'config all value system cms' },
    // sale page 
    SaleView: { value: 'cms_sale_view', description: 'full action with role lead' },
    SaleUpdate: { value: 'cms_sale_update', description: 'full action with role lead' },
    SaleLead: { value: 'cms_sale_admin', description: 'full action with role lead' },
    // cp page 
    CPView: { value: 'cms_cp_view', description: 'full action with role supervisor' },
    CPUpdate: { value: 'cms_cp_update', description: 'full action with role supervisor' },
    CPLead: { value: 'cms_cp_admin', description: 'full action with role supervisor' },
  }
}
  