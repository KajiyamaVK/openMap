using Dapper;
using OpenMapRepo.Model;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using OpenMapRepo.Interfaces;

namespace OpenMapRepo.Repository
{
    public class OpenMapRepository : IOpenMapRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string? connectionstring;

        public OpenMapRepository(IConfiguration configuration) { 
        
            _configuration = configuration;
            connectionstring = _configuration.GetConnectionString("SqlConnection");

        }

        public async Task<IEnumerable<OpenMapResponse>> SearchAllPlaces(int SearchPageNumber,string? searchText)
        {
            

            string? whereClause = searchText != "All" ? $"WHERE NAME_PLACE like '%{searchText}%' or DESC_PLACE like '%{searchText}%'" : "";

            string? sql = @"
                DECLARE @PageNumber AS INT, @RowspPage AS INT
                SET @PageNumber = "+ SearchPageNumber + @"
                SET @RowspPage = 20
                
                SELECT 
                    id_place_pk AS IdPlace
                    ,name_place AS NamePlace
                    ,desc_place AS DescPlace
                    ,date_inserted AS DateInserted
                    ,date_updated AS DateUpdated
                    ,name_city AS NameCity
                    ,name_uf AS NameUf
                    ,CASE
					    WHEN photo_url is null then 'https://picsum.photos/1780/200' 
					    ELSE photo_url
				    END AS PhotoUrl
                    ,DESC_REFERENCE AS DescReference
                    ,C.TOTAL_RECORDS AS TotalRecords
                FROM PLACES
                JOIN (SELECT count(*) total_records FROM places " + whereClause + @") c ON 1=1
                " + whereClause + @"
                ORDER BY date_inserted DESC
                OFFSET ((@PageNumber - 1) * @RowspPage) ROWS
                FETCH NEXT @RowspPage ROWS ONLY";

            using SqlConnection con = new(connectionstring);
            return await con.QueryAsync<OpenMapResponse>(sql);
            
        }

        public async Task<OpenMapResponse> SearchPlace(int id)
        {
            

            string? sql = @"
                SELECT 
                    ID_PLACE_PK AS IdPlace
                    ,NAME_PLACE AS NamePlace
                    ,DESC_PLACE AS DescPlace
                    ,DATE_INSERTED AS DateInserted
                    ,DATE_UPDATED AS DateUpdated
                    ,NAME_CITY AS NameCity
                    ,NAME_UF AS NameUf
                    ,DESC_REFERENCE AS DescReference
                    ,CASE
						WHEN PHOTO_URL is null then 'https://picsum.photos/1780/200' 
						ELSE PHOTO_URL
					END AS PhotoUrl 
                FROM PLACES
                WHERE ID_PLACE_PK = @Id";

            using SqlConnection con = new(connectionstring);
            return await con.QueryFirstOrDefaultAsync<OpenMapResponse>(sql,new { Id = id });

        }


        public async Task<bool> UpdatePlace(OpenMapRequest request, int ID)
        {

            string? sql = @"
                UPDATE PLACES
                    SET NAME_PLACE = @NamePlace
                    ,DESC_PLACE = @DescPlace
                    ,NAME_CITY = @NameCity
                    ,NAME_UF = @NameUf
                    ,PHOTO_URL = @PhotoUrl
                    ,DESC_REFERENCE = @DescReference
                WHERE ID_PLACE_PK = @ID";

            using SqlConnection con = new(connectionstring);

            var parametros = new DynamicParameters();

            parametros.Add("NamePlace", request.NamePlace);
            parametros.Add("DescPlace", request.DescPlace);
            parametros.Add("NameCity", request.NameCity);
            parametros.Add("NameUf", request.NameUf);
            parametros.Add("PhotoUrl", request.PhotoUrl);
            parametros.Add("DescReference", request.DescReference);
            parametros.Add("Id", ID);

            return await con.ExecuteAsync(sql, parametros) > 0;
        }

        public async Task<bool> AddPlace(OpenMapRequest request)
        {
            string? sql = @"

            INSERT INTO dbo.PLACES
                (NAME_PLACE
                ,DESC_PLACE
                ,NAME_CITY
                ,NAME_UF
                ,PHOTO_URL
                ,DESC_REFERENCE)
             VALUES(
                @NamePlace
               ,@DescPlace 
               ,@NameCity
               ,@NameUf
                ,CASE
					WHEN @PhotoUrl = '' THEN 'https://picsum.photos/300/200' 
					ELSE @PhotoUrl
				END
               ,@DescReference)";

            using SqlConnection con = new(connectionstring);
            return await con.ExecuteAsync(sql, request) > 0;
            
        }

        public async Task<bool> DeletePlace(int id)
        {
            string? sql = @"

            DELETE 
            FROM PLACES
            WHERE id_place_pk = @Id";

            using SqlConnection con = new(connectionstring);


            return await con.ExecuteAsync(sql, new { Id = id }) > 0;
        }

    }
}
