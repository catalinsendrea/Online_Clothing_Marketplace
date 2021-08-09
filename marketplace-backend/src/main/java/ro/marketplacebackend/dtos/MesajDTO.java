package ro.marketplacebackend.dtos;

public class MesajDTO {

    private Integer id;
    private String expeditor;
    private String subiect;
    private String mesaj;
    private String destinatar;

    public MesajDTO(){

    }

    public MesajDTO(Integer id, String expeditor, String subiect, String mesaj, String destinatar) {
        this.id = id;
        this.expeditor = expeditor;
        this.subiect = subiect;
        this.mesaj = mesaj;
        this.destinatar = destinatar;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSubiect() {
        return subiect;
    }

    public void setSubiect(String subiect) {
        this.subiect = subiect;
    }

    public String getMesaj() {
        return mesaj;
    }

    public void setMesaj(String mesaj) {
        this.mesaj = mesaj;
    }

    public String getExpeditor() { return expeditor; }

    public void setExpeditor(String expeditor) { this.expeditor = expeditor; }

    public String getDestinatar() { return destinatar; }

    public void setDestinatar(String destinatar) { this.destinatar = destinatar; }
}
