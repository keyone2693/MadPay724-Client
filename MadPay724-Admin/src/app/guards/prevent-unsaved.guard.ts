import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { UserEditInfoComponent } from '../components/panel/components/admin/userinfo/profile/components/user-edit-info/user-edit-info.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedGuard implements CanDeactivate<UserEditInfoComponent> {

  canDeactivate(component: UserEditInfoComponent) {
    if (component.editForm.dirty) {
        return confirm('شما تغییراتی ایجاد کرده اید با خروج تغیرات ذخیره نمیشود');
    }
    return true;
  }
}
