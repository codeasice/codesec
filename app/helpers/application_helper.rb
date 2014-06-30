module ApplicationHelper
class ActionView::Helpers::FormBuilder
  def inputbox_field(method, options = {})
    text_field(method, options.merge(class: 'form-control'))
  end
end
end
