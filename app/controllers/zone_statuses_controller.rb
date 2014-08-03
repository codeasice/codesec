class ZoneStatusesController < ApplicationController
  # GET /zone_statuses
  # GET /zone_statuses.json
  def index
    @zone_statuses = ZoneStatus.order(:id).page(params[:page])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @zone_statuses }
    end
  end

  # GET /zone_statuses/recent
  # GET /zone_statuses/recent.json
  def recent
    @from_id = params[:from_id].to_i
    if @from_id > 0
      @zone_statuses = ZoneStatus.where('id > ? and status=1', @from_id).order("id desc")
    else
      @Ids = ZoneStatus.select("id").group("zone")
      @zone_statuses = ZoneStatus.where('id in (?)', @Ids)
    end  

    respond_to do |format|
      format.html # recent.html.erb
      format.json { render json: @zone_statuses }
    end
  end


  # GET /zone_statuses/1
  # GET /zone_statuses/1.json
  def show
    @zone_status = ZoneStatus.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @zone_status }
    end
  end

  # GET /zone_statuses/new
  # GET /zone_statuses/new.json
  def new
    @zone_status = ZoneStatus.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @zone_status }
    end
  end

  # GET /zone_statuses/1/edit
  def edit
    @zone_status = ZoneStatus.find(params[:id])
  end

  # POST /zone_statuses
  # POST /zone_statuses.json
  def create
    @zone_status = ZoneStatus.new(params[:zone_status])

    respond_to do |format|
      if @zone_status.save
        format.html { redirect_to @zone_status, notice: 'Zone status was successfully created.' }
        format.json { render json: @zone_status, status: :created, location: @zone_status }
      else
        format.html { render action: "new" }
        format.json { render json: @zone_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /zone_statuses/1
  # PUT /zone_statuses/1.json
  def update
    @zone_status = ZoneStatus.find(params[:id])

    respond_to do |format|
      if @zone_status.update_attributes(params[:zone_status])
        format.html { redirect_to @zone_status, notice: 'Zone status was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @zone_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /zone_statuses/1
  # DELETE /zone_statuses/1.json
  def destroy
    @zone_status = ZoneStatus.find(params[:id])
    @zone_status.destroy

    respond_to do |format|
      format.html { redirect_to zone_statuses_url }
      format.json { head :no_content }
    end
  end
end
