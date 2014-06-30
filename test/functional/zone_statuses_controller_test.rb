require 'test_helper'

class ZoneStatusesControllerTest < ActionController::TestCase
  setup do
    @zone_status = zone_statuses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:zone_statuses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create zone_status" do
    assert_difference('ZoneStatus.count') do
      post :create, zone_status: { stamp: @zone_status.stamp, status: @zone_status.status, zone: @zone_status.zone }
    end

    assert_redirected_to zone_status_path(assigns(:zone_status))
  end

  test "should show zone_status" do
    get :show, id: @zone_status
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @zone_status
    assert_response :success
  end

  test "should update zone_status" do
    put :update, id: @zone_status, zone_status: { stamp: @zone_status.stamp, status: @zone_status.status, zone: @zone_status.zone }
    assert_redirected_to zone_status_path(assigns(:zone_status))
  end

  test "should destroy zone_status" do
    assert_difference('ZoneStatus.count', -1) do
      delete :destroy, id: @zone_status
    end

    assert_redirected_to zone_statuses_path
  end
end
